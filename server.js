import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const nodemailer = require("nodemailer");

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

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

app.post("/inviteUser", async (req, res) => {
	try {
		const { fromUserId, toUserEmail, mode } = req.body;
		console.log(fromUserId, toUserEmail, mode);
		//Kolla i databasen om e-postadressen i toUser finns bland users. om ja, skapa invite i databasen, skicka en notis om projekt = mode = "notification"
		//Om usern inte finns kopplad, skapa en invite i databasen, skicka ett mejl om att användaren ska signa upp sig. "mode="newUser"
		const inviteId = "12345";
		if (mode === "newUser") {
			const emailResults = await sendEmail(
				fromUserId,
				toUserEmail,
				mode,
				inviteId
			);
			console.log("SEnding results to user");
			res.sendStatus(emailResults);
		} else {
			const emailResults = await sendEmail(fromUserId, toUserEmail, mode);
			console.log("SEnding results to user");
			res.sendStatus(emailResults);
		}
	} catch (error) {
		res
			.json({ message: "Something went wrong in sending the invite." })
			.sendStatus(400);
	}
});

const sendEmail = async (fromUserName, toUserEmail, mode, inviteId = -1) => {
	try {
		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "tsk.project.planner@gmail.com",
				pass: "Technigo123",
			},
		});

		const mailOptions = {
			from: "tsk.project.planner@gmail.com",
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

		transport.sendMail(mailOptions, (err, info) => {
			console.log("Message sent: %s", info.messageId);
		});
		//res.sendStatus(200);
		return 200;
	} catch (error) {
		//console.log("Message not sent: %s");
		throw "Error, message not sent.";
		//return "400";
	}
};

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
