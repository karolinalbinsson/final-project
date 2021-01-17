import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const nodemailer = require("nodemailer");
dotenv.config();

const mongoUrl =
	process.env.MONGO_URL || "mongodb://localhost/project-test-users";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
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

const baseOptions = {
	discriminatorKey: "__type",
	collection: "project-planner-collection",
};

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{ collection: "project-planner-collection" }
);

const inviteSchema = new mongoose.Schema(
	{
		createdBy: {
			type: String,
			required: true,
		},
		createdForEmail: {
			type: String,
			required: true,
		},
		createdForUserId: {
			type: String,
			default: null,
		},
		projectId: {
			type: String,
			required: true,
		},
	},
	{ collection: "project-planner-collection" }
);

//To be able to store different collections/schemas(?) in the same db.
const Base = mongoose.model("Base", new Schema({}, baseOptions));
const User = Base.discriminator("User", userSchema);
const Invite = Base.discriminator("Invite", inviteSchema);

// Start defining your routes here
app.get("/", (req, res) => {
	res.send("Hello world");
});

//For creating some basic html to send to the user.
const createHtmlNewUser = (toUser, fromUser, inviteId) => {
	let htmlstring = `<h2>Hey ${toUser}!</h2><br>`;
	htmlstring += `${fromUser} has invited you to collaborate on a project in project planner.<br>`;
	htmlstring += `<a href="https://www.google.se/replyInvite/${inviteId}">Click to register and get access to the project<a>`;
	htmlstring += `<p> The link in plain text: https://www.google.se/replyInvite/${inviteId} </p>`;
	return htmlstring;
};

const createHtmlNotification = (toUser, fromUser) => {
	let htmlstring = `<h2>Hey ${toUser}!</h2><br>`;
	htmlstring += `${fromUser} has invited you to collaborate on a project in project planner.<br>`;
	htmlstring += `<a href="https://www.google.se/">Click to sign in and have a look at the project!<a>`;
	return htmlstring;
};

//Endpoint for sending an invite-email to a user.
app.post("/inviteUser", async (req, res) => {
	try {
		const { fromUserId, toUserEmail, projectID } = req.body;
		let mode = "";
		let userIdFor = null;
		let userFromName = null;

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
			const emailResults = await sendEmail(userFromName, toUserEmail, mode);
			console.log("E-mail results:", emailResults);
			res.json({ message: "Send OK" }).status(200);
		}
	} catch (error) {
		console.log("Caught an error, sending error results to user.");
		console.log(error);
		res
			.json({
				message: "Something went wrong in sending the invite.",
				error: error,
			})
			.status(400);
	}
});

const sendEmail = async (fromUserName, toUserEmail, mode, inviteId = -1) => {
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
					: createHtmlNotification(toUserEmail, fromUserName),
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

app.post("/users", async (req, res) => {
	try {
		const { email, name } = req.body;
		const user = await new User({
			email,
			name,
		}).save();

		res
			.status(201)
			.json({ userId: user._id, email: user.email, name: user.name });
	} catch (err) {
		res.status(400).json({ message: "could not create user", errors: err });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
