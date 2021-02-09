//QUESTIONS:
//Hur namnger vid route för project/:id
//status code if invite already has been send to user 409 just nu

//TODO BACKEND:
//Login endpoint, lägg till accessToken (SARA)
//Create POST/COMMENT model
//POST comments/post endpoint (kolla att notifiering skickas till invjudna users)
//hur får vi till att posta filer (bilder, länkar etc)
//GET comments/post endpoint
//UPDATE (edit) project endpoint - kolla att notifiering skickas till inbjudna users
//Får alla post när man är kopplad till projektet
//Get project får se dom projekt man är inbjuden till (userId i project array)
// users/logout endpoint där vi rensar accessToken

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { userSchema } from "./models/User";
import { projectSchema } from "./models/Project";
import { inviteSchema } from "./models/Invite";
import { postSchema } from "./models/Post";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import cloudinaryStorage from "multer-storage-cloudinary";

import {
	createHtmlInvite,
	createHtmlNotification,
} from "./email-templates/emailTemplates";
//import { isBuffer } from "util";

const nodemailer = require("nodemailer");
dotenv.config();

const SERVICE_UNAVAILABLE = "Service unavailable";
const LOGIN_FAILED = "Please try logging in again";
const POST_FAILED = "Could not create user";
const USER_NOT_FOUND = "User not found";
const LOGOUT_FAILED = "Could not logout";
const ACCESS_DENIED = "Access denied";
const USER_ALREADY_INVITED = "User already invited";
const INVITE_REPLY_FAILED = "Could not reply on invite";
const NOT_ALLOWED = "Not allowed";
const UPDATE_FAILED = "Update failed";
const ADD_IMAGE_FAILED = "Image upload failed";

const mongoUrl =
	process.env.MONGO_URL || "mongodb://localhost/project-planner2";
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
mongoose.Promise = Promise;

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
	cloud_name: "dcusmr4ub", // this needs to be whatever you get from cloudinary
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
	cloudinary,
	params: {
		folder: "projects",
		allowedFormats: ["jpg", "png"],
		transformation: [{ width: 400, height: 400, crop: "limit" }],
	},
});
const parser = multer({ storage });

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Error message if server is down
app.use((req, res, next) => {
	if (mongoose.connection.readyState === 1) {
		next();
	} else {
		res.status(503).send({ error: SERVICE_UNAVAILABLE });
	}
});

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
	try {
		const user = await User.findOne({
			accessToken: req.header("Authorization"),
		});

		if (!user) {
			throw USER_NOT_FOUND;
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ message: LOGIN_FAILED, errors: err.errors });
	}
};

// Middleware to hash password before new user is saved
userSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) {
		return next();
	}

	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(user.password, salt);
	next();
});

// Model
const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);
const Invite = mongoose.model("Invite", inviteSchema);
const Post = mongoose.model("Post", postSchema);

const listEndpoints = require("express-list-endpoints");

// Start defining your routes here
app.get("/", (req, res) => {
	res.send(listEndpoints(app));
});

//Create user
app.post("/users", async (req, res) => {
	try {
		const { email, name, lastName, password } = req.body;
		const user = await new User({
			email,
			name,
			lastName,
			password,
		}).save();
		res.status(200).json({
			userId: user._id,
			accessToken: user.accessToken,
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			lastLogin: user.lastLoginDate,
		});
	} catch (err) {
		if (err.code === 11000) {
			res.status(409).json({
				message: "USER ALREADY EXISTS",
				errors: { message: err.message, error: err },
			});
		} else {
			res.status(400).json({
				message: POST_FAILED,
				errors: { message: err.message, error: err },
			});
		}
	}
});

//Add profile image
app.patch("/users/:userId", parser.single("image"), async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findOneAndUpdate(
			{ _id: userId },
			{ image: { imageName: req.file.filename, imageUrl: req.file.path } },
			{ new: true }
		);
		res.status(200).json(user);
		console.log({ user });
	} catch (err) {
		console.log("error in path user", err);
		res.status(400).json({
			message: ADD_IMAGE_FAILED,
			errors: { message: err.message, error: err },
		});
	}
});

//Get user
app.get("/users/:userId", authenticateUser);
app.get("/users/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findById({
			_id: userId,
		}).lean();
		console.log("User", user);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({
			error: "USER NOT FOUND",
			errors: { message: err.message, error: err },
		});
	}
});
//Delete user
app.delete("/users/:userId/", authenticateUser);
app.delete("/users/:userId/", async (req, res) => {
	try {
		const userId = req.params.userId;
		const defaultUser = process.env.DEFAULT_USER;
		console.log("defaultuser", defaultUser);
		//To check if the authorized user is the same as the user-Id in the URL.
		//User can only delete themselves.
		if (userId != req.user._id) {
			throw NOT_ALLOWED;
		}

		const updatedProjects = Project.updateMany(
			{ creator: { $eq: req.user._id } },
			{ $set: { creator: process.env.DEFAULT_USER } },
			function (err, docs) {
				if (err) {
					console.log(err);
				} else {
					console.log("Updated Docs : ", docs);
				}
			}
		);

		const deletedComments = await Post.deleteMany(
			{ createdBy: req.user._id },
			function (err, docs) {
				if (err) {
					console.log(err);
				} else {
					console.log("Updated Docs : ", docs);
				}
			}
		);

		const deletedUser = await User.deleteOne({
			_id: userId,
		});

		if (
			deletedComments &&
			updatedProjects &&
			deletedUser.deletedCount > 0 &&
			deletedUser.ok === 1
		) {
			res.status(200).json(deletedUser);
		} else throw USER_NOT_FOUND;
	} catch (err) {
		res.status(404).json({
			error: USER_NOT_FOUND,
			errors: { message: err.message, error: err },
		});
	}
});

// POST - login user
app.post("/sessions", async (req, res) => {
	try {
		const { email, password } = req.body;
		const updateDate = new Date();
		const user = await User.findOne({ email });
		if (user && bcrypt.compareSync(password, user.password)) {
			user.accessToken = crypto.randomBytes(128).toString("hex");

			const updatedUser = await user.save();
			res.status(200).json({
				userId: updatedUser._id,
				accessToken: updatedUser.accessToken,
				name: updatedUser.name,
				lastName: updatedUser.lastName,
				image: updatedUser.image,
				email: updatedUser.email,
				createdAt: updatedUser.createdAt,
				lastLogin: updateDate,
			});
		} else {
			throw USER_NOT_FOUND;
		}
	} catch (err) {
		res.status(404).json({
			message: USER_NOT_FOUND,
			errors: { message: err.message, error: err },
		});
	}
});

//POST - logout user
app.post("/users/logout", authenticateUser);
app.post("/users/logout", async (req, res) => {
	try {
		//console.log('try');
		req.user.accessToken = null;
		await req.user.save();
		res.status(200).json({ loggedOut: true });
	} catch (err) {
		//console.log('catch');
		res.status(400).json({
			error: LOGOUT_FAILED,
			errors: { message: err.message, error: err },
		});
	}
});

//create project
app.post("/projects", async (req, res) => {
	try {
		const {
			projectName,
			projectShortDescription,
			projectLongDescription,
			creator,
		} = req.body;
		//console.log(req.body);
		const project = await new Project({
			projectName,
			projectShortDescription,
			projectLongDescription,
			creator,
		}).save();
		res.status(200).json({
			projectId: project._id,
		});
	} catch (err) {
		res.status(400).json({
			message: "could not save project",
			errors: { message: err.message, error: err },
		});
	}
});

//Add image to project
app.patch(
	"/projects/:projectId/image",
	parser.single("image"),
	async (req, res) => {
		const { projectId } = req.params;
		try {
			const project = await Project.findOneAndUpdate(
				{ _id: projectId },
				{ image: { imageName: req.file.filename, imageUrl: req.file.path } },
				{ new: true }
			);
			res.status(200).json(project);
		} catch (err) {
			res.status(400).json({
				message: ADD_IMAGE_FAILED,
				errors: { message: err.message, error: err },
			});
		}
	}
);

// app.post('/pets', parser.single('image'), async (req, res) => {
// 	res.json({ imageUrl: req.file.path, imageId: req.file.filename})
// })

//get all created projects on my dashboard
//eventuellt ändra till /users/:userId/projects
//Vi skulle kunna ta bort userId i urlen och göra samma som på de andra, att vi hämtar
//userid från req.objektet på rad 255.
app.get("/projects/", authenticateUser);
app.get("/projects/", async (req, res) => {
	try {
		//22/1 ändrat så att userId plockas från AUTH istället för urlen. snyggare tycker jag?
		//const userId = req.params.userId;
		//console.log(userId);
		//console.log(typeof req.user._id);
		//if (userId != req.user._id) {
		//throw ACCESS_DENIED;
		//}
		//Här har jag lagt till en populate för att hämta registrerade users som matchar på e-post(invitedusers -> email i user).
		//Om det ligger en e-post i inbjudningar men som inte är registrerad ännu så syns den inte förrän användaren registrerat sig.
		const emailToFind = await User.find({ _id: req.user._id }).lean().select({
			email: 1,
			_id: 0,
		});

		//console.log(emailToFind[0].email);
		const createdProjects = await Project.find({
			$or: [
				{ creator: req.user._id },
				{ invitedUsersEmail: emailToFind[0].email },
			],
		})
			.sort({ createdAt: -1 })
			.lean()
			.populate("creator", "name")
			.populate({
				path: "usersInvited",
				select: "invitedUsersEmail _id name lastName image.imageUrl",
			});
		res.status(200).json(createdProjects);
	} catch (err) {
		//console.log('catchen');
		res.status(403).json({
			error: ACCESS_DENIED,
			errors: { message: err.message, error: err },
		});
	}
});

//Get one project
//Ändrat i URLEN så att vi bara behöver skicka in projekt-id och inte en till /projects
app.get("/projects/:projectId", authenticateUser);
app.get("/projects/:projectId", async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const project = await Project.findById({
			_id: projectId,
		})
			.lean()
			.populate("creator", "name")
			.populate({
				path: "usersInvited",
				select: "invitedUsersEmail _id name lastName image.imageUrl",
			})
			.populate({
				path: "posts",
				populate: {
					path: "createdBy",
					model: "User",
				},
			});
		console.log("project", project);
		res.status(200).json(project);
	} catch (err) {
		res.status(404).json({
			error: "PROJECT NOT FOUND",
			errors: { message: err.message, error: err },
		});
	}
});

//delete a project
app.delete("/projects/:projectId", authenticateUser);
app.delete("/projects/:projectId", async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const userId = req.user._id.toString();
		console.log(req.user._id.toString());
		const project = await Project.findOne({
			_id: projectId,
		});
		const projectCreator = project.creator.toString();
		if (
			userId === projectCreator ||
			projectCreator === process.env.DEFAULT_USER
		) {
			console.log("inside delete if");
			const deletedProject = await Project.deleteOne({
				_id: projectId,
				//creator: req.user._id,
			});

			if (deletedProject.deletedCount > 0 && deletedProject.ok === 1) {
				res.status(200).json(deletedProject);
			} else throw "Project not found";
		} else {
			res.status(405).json({
				error: NOT_ALLOWED,
				errors: { message: "Only the creator can delete a project" },
			});
		}
	} catch (err) {
		res.status(404).json({
			error: "PROJECT NOT FOUND",
			errors: { message: err.message, error: err },
		});
	}
});

//Update a project
app.patch("/projects/:projectId", authenticateUser);
app.patch("/projects/:projectId", async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const updateDate = new Date();
		const {
			projectName,
			projectShortDescription,
			projectLongDescription,
		} = req.body;
		//console.log(req.body);

		const project = await Project.findOneAndUpdate(
			{ _id: projectId },
			{
				$set: {
					updatedAt: updateDate,
					projectName,
					projectShortDescription,
					projectLongDescription,
				},
			},
			{ new: true }
		);
		res.status(200).json({
			projectId: project._id,
		});
	} catch (err) {
		res.status(400).json({
			message: UPDATE_FAILED,
			errors: { message: err.message, error: err },
		});
	}
});

//Create a comment on a project
app.post("/comments", async (req, res) => {
	try {
		const { projectId, message, createdBy } = req.body;
		const updateDate = new Date();
		console.log(req.body);

		const post = await new Post({
			message,
			createdBy,
			projectId,
		}).save();

		if (post) {
			const updatedProject = await Project.findOneAndUpdate(
				{ _id: projectId },
				{ $push: { posts: post._id }, $set: { updatedAt: updateDate } },
				{ new: true }
			);

			res.status(200).json({
				post,
				updatedProject,
			});
		}
	} catch (err) {
		res.status(400).json({
			message: "could not save project",
			errors: { message: err.message, error: err },
		});
	}
});
app.get("/comments/:projectId", async (req, res) => {
	try {
		const projectId = req.params.projectId;
		const comments = await Post.find({
			projectId: projectId,
		})
			.sort({ createdAt: -1 })
			.lean();
		res.status(200).json(comments);
	} catch (err) {
		res.status(404).json({
			error: "COMMENTS NOT FOUND",
			errors: { message: err.message, error: err },
		});
	}
});

app.patch("/comments/:postId", parser.single("image"), async (req, res) => {
	const { postId } = req.params;
	try {
		const post = await Post.findOneAndUpdate(
			{ _id: postId },
			{ image: { imageName: req.file.filename, imageUrl: req.file.path } },
			{ new: true }
		);
		res.status(200).json(post);
	} catch (err) {
		res.status(400).json({
			message: ADD_IMAGE_FAILED,
			errors: { message: err.message, error: err },
		});
	}
});
//Endpoint for sending an invite-email to a user.
app.post("/inviteUser", authenticateUser);
app.post("/inviteUser", async (req, res) => {
	try {
		const { fromUserId, toUserEmail, projectId } = req.body;
		console.log({ fromUserId, toUserEmail, projectId });
		let mode = "invite";
		let userFromName = null;

		//Check if the email is already added in the project
		const isAlreadyInvited = await Project.findOne({
			invitedUsersEmail: toUserEmail,
			_id: projectId,
		});

		if (isAlreadyInvited) {
			res.status(409).json({
				message: USER_ALREADY_INVITED,
			});
		}
		//If the email-adress is not in the invitedusers-list, continue with updating the project and send a notification to the e-mailaddress.
		else {
			//Check the name of sender using the userid sent in the invite.
			const userFrom = await User.findOne({ _id: fromUserId });
			if (userFrom) {
				console.log("Found user", userFrom);
			} else console.log("user not found");
			userFrom ? (userFromName = userFrom.name) : userFromName === "A friend";

			//Save e-mail in the invitedUsersEmail-array on the project
			const updatedProject = await Project.updateOne(
				{ _id: projectId },
				{ $push: { invitedUsersEmail: toUserEmail } }
			);

			console.log(updatedProject);

			const emailResults = await sendEmail(userFromName, toUserEmail, mode);
			console.log("E-mail results:", emailResults);
			res
				.json({
					message: "Send OK",
					projectUpdated: updatedProject,
					invitedUser: toUserEmail,
				})
				.status(200);
		}
	} catch (error) {
		console.log("Caught an error, sending error results to user.");
		console.log(error);
		res
			.json({
				message: "Something went wrong in sending the invite.",
				//error: error,
				errors: { message: error.message, errors: error },
			})
			.status(400);
	}
});
/* Test new invite user end*/

const sendEmail = async (fromUserName, toUserEmail, mode, userNameFor = "") => {
	try {
		const transport = nodemailer.createTransport({
			service: process.env.MAIL_SERVICE,
			auth: {
				user: process.env.MAIL_FROM,
				pass: process.env.MAIL_PW,
			},
		});

		const mailOptions = {
			from: `👋 Project Planner 👋 ${process.env.MAIL_FROM}`,
			to: toUserEmail,
			subject:
				mode === "invite"
					? "Project Planner invite"
					: "Project Planner notification",
			text: "Hey there, it’s our first message sent with Nodemailer ;) ",
			html:
				mode === "invite"
					? createHtmlInvite(userNameFor, fromUserName)
					: createHtmlNotification(userNameFor, fromUser),
		};

		const emailInfo = await transport.sendMail(mailOptions);
		return emailInfo;
	} catch (error) {
		console.log(error);
		throw "Error, message not sent.";
	}
};

//Reply on invite. All of this can be removed. User sees the projects when they log in. No need to reply.
/*
app.get("/replyInvite/:inviteId", async (req, res) => {
	try {
		const inviteId = req.params.inviteId;
		const pendingInvite = await Invite.find({ _id: inviteId });
		res.status(200).json(pendingInvite);
	} catch (err) {
		res.status(403).json({
			error: INVITE_REPLY_FAILED,
			errors: { message: err.message, error: err },
		});
	}
});

//Resond on invite (add password email predefined)
app.post("/replyInvites/:inviteId/", async (req, res) => {
	try {
		const inviteId = req.params.inviteId;
		const { email, name, password, projectId } = req.body;

		//KAN MAN GÖRA DETTA PÅ ETT ANNAT SÄTT? + rad 350
		const InviteToReply = await Invite.findOne({
			$and: [{ _id: inviteId }, { createdForUserId: null }],
		});
		// ({ $and [
		// 	_id: inviteId,
		// 	createdForUserId: null,
		// ]

		// });
		console.log(InviteToReply);
		if (InviteToReply) {
			const user = await new User({ email, name, password }).save();

			if (user) {
				await Project.updateOne(
					{ _id: projectId },
					{ $push: { invitedUsers: user._id } }
				);
				await Invite.updateOne(
					{ _id: inviteId },
					{ createdForUserId: user._id }
				);
			}
			// if (invite && project)
			res.status(200).json({
				message: "Invite reply successful",
			});
		} else {
			res
				.status(200)
				.json({ message: "User has already replied to this invite." });
		}
	} catch (err) {
		res.status(400).json({
			message: POST_FAILED,
			errors: { message: err.message, error: err },
		});
	}
});
*/

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
