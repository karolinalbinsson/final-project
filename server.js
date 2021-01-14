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

const createHtmlString = (username, sendername) => {
	const htmlstring = `<h2>Hey ${username}!</h2><br> ${sendername} has invited you to join project planner. Click to register`;
	return htmlstring;
};

app.get("/sendEmail", (req, res) => {
	var transport = nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "9b1266095cf09d",
			pass: "ab2f81e378a596",
		},
	});

	var mailOptions = {
		from: '"Example Team" <from@example.com>',
		to: "karolin.albinsson@gmail.com",
		subject: "Invitation to Project Planner",
		text: "Hey there, it’s our first message sent with Nodemailer ;) ",
		html: createHtmlString("Karolin", "Therese"),
	};

	transport.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.send("Error");
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
		res.send("mail sent");
	});
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
