import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { userSchema } from './models/User';
import { projectSchema } from './models/Project';
import { inviteSchema } from './models/Invite';

import { createHtmlNewUser, createHtmlNotification } from './email-templates/emailTemplates'

const nodemailer = require("nodemailer");
dotenv.config();

const SERVICE_UNAVAILABLE = 'Service unavailable';
const LOGIN_FAILED = 'Please try logging in again';
const POST_FAILED = 'Could not create user';
const USER_NOT_FOUND = 'User not found';
const LOGOUT_FAILED = 'Could not logout';
const ACCESS_DENIED = 'Access denied';

const mongoUrl =
	process.env.MONGO_URL || "mongodb://localhost/project-test-users";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

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
      accessToken: req.header('Authorization'),
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

// const baseOptions = {
// 	discriminatorKey: "__type",
// 	collection: "project-planner-collection",
// };

// Middleware to hash password before new user is saved
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

// Model
const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);
const Invite = mongoose.model('Invite', inviteSchema);


//To be able to store different collections/schemas(?) in the same db.
//const Base = mongoose.model("Base", new Schema({}, baseOptions));
//const User = Base.discriminator("User", userSchema);
//const Invite = Base.discriminator("Invite", inviteSchema);

const listEndpoints = require('express-list-endpoints');


// Start defining your routes here
app.get("/", (req, res) => {
	//res.send("Hello world");
	res.send(listEndpoints(app));
});

//Create user
app.post('/users', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await new User({
      email,
      name,
      password,
    }).save();
    res.status(200).json({
      userId: user._id,
      accessToken: user.accessToken,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json({
      message: POST_FAILED,
      errors: { message: err.message, error: err },
    });
  }
});

// POST - login user
app.post('/sessions', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      user.accessToken = crypto.randomBytes(128).toString('hex');

      const updatedUser = await user.save();
      res.status(200).json({
        userId: updatedUser._id,
        accessToken: updatedUser.accessToken,
        name: updatedUser.name,
      });
    } else {
      throw USER_NOT_FOUND;
    }
  } catch (err) {
    res.status(404).json({ message: USER_NOT_FOUND, errors: { message: err.message, error: err } });
  }
});

//create project 
app.post('/projects', async (req, res) => {
  try {
    const { projectName, projectDescription, creator } = req.body;
    const project = await new Project({
			projectName,
			projectDescription,
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

//get all created projects on my dashboard
//eventuellt ändra till /users/:userId/projects
app.get('/projects/:userId', authenticateUser);
app.get('/projects/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId != req.user._id) {
      throw ACCESS_DENIED;
		}
		const createdProjects = await Project.find({ creator: userId }).lean().populate('creator', 'name')
    res.status(200).json(createdProjects)
  } catch (err) {
    res.status(403).json({ error: ACCESS_DENIED, errors: { message: err.message, error: err } });
  }
});

//Endpoint for sending an invite-email to a user.
app.post('/inviteUser', authenticateUser);
app.post("/inviteUser", async (req, res) => {
	try {
		const { fromUserId, toUserEmail, projectID } = req.body;
		let mode = "";
		let userIdFor = null;
		let userFromName = null;
		let userNameFor = null;

		//Check if the invited user exists.
		const user = await mongoose.model("User").findOne({ email: toUserEmail });
		if (user) {
			mode = "notification";
			userIdFor = user._id;
			userNameFor = user.name; 
		} else {
			mode = "newUser";
		}
		console.log(mode);

		//Check the name of sender using the userid sent in the invite.
		const userFrom = await mongoose.model("User").findOne({ _id: fromUserId });
		if (userFrom) {
			console.log("Found user", userFrom);
		} else console.log("user not found");
		userFrom ? (userFromName = userFrom.name) : userFromName === "A friend";

		//Save a new invite in db. If the to-user has been found already, it's userid will be saved at once.
		const invite = await new Invite({
			createdBy: fromUserId,
			createdForEmail: toUserEmail,
			createdForUserId: userIdFor,
			projectId: projectID,
		}).save();
		console.log("Invite saved:", invite);

		const inviteId = invite._id;

		if (mode === "newUser") {
			const emailResults = await sendEmail(
				userFromName,
				toUserEmail,
				mode,
				inviteId
			);
			console.log("E-mail results:", emailResults);
			res.json({ message: "Send OK" }).status(200);
		} else {
			const emailResults = await sendEmail(userFromName, toUserEmail, mode, userNameFor);
			console.log("E-mail results:", emailResults);
			res.json({ message: "Send OK" }).status(200);
		}
	} catch (error) {
		console.log("Caught an error, sending error results to user.");
		console.log(error);
		res
			.json({
				message: "Something went wrong in sending the invite.",
				//error: error,
				errors : { message: error.message, errors: error }
			})
			.status(400);
	}
});

const sendEmail = async (fromUserName, toUserEmail, mode, userNameFor = null, inviteId = -1) => { ///varför -1?
	try {
		const transport = nodemailer.createTransport({
			service: process.env.MAIL_SERVICE,
			auth: {
				user: process.env.MAIL_FROM,
				pass: process.env.MAIL_PW,
			},
		});

		const mailOptions = {
			from: process.env.MAIL_FROM,
			to: toUserEmail,
			subject:
				mode === "newUser"
					? "Invitation to join Project Planner"
					: "Project Planner notification",
			text: "Hey there, it’s our first message sent with Nodemailer ;) ",
			html:
				mode === "newUser"
					? createHtmlNewUser(toUserEmail, fromUserName, inviteId)
					: createHtmlNotification(userNameFor, fromUserName),
		};

		const emailInfo = await transport.sendMail(mailOptions);
		return emailInfo;
		//res.sendStatus(200);
		//	return 200;
	} catch (error) {
		//console.log("Message not sent: %s");
		throw "Error, message not sent.";
		//return "400";
	}
};

// POST - registration endpoint (creates user)


// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
