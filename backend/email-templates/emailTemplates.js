//For creating some basic html to send to the user.
export const createHtmlNewUser = (toUser, fromUser, inviteId) => {
	let htmlstring = `<h2>Hey ${toUser}!</h2><br>`;
	htmlstring += `${fromUser} has invited you to collaborate on a project in project planner.<br>`;
	htmlstring += `<a href="https://www.google.se/replyInvite/${inviteId}">Click to register and get access to the project<a>`;
	htmlstring += `<p> The link in plain text: https://www.google.se/replyInvite/${inviteId} </p>`;
	return htmlstring;
};

export const createHtmlNotification = (userNameFor, fromUser) => {
	let htmlstring = `<h2>Hey ${userNameFor}!</h2><br>`;
	htmlstring += `${fromUser} has invited you to collaborate on a project in project planner.<br>`;
	htmlstring += `<a href="https://www.google.se/">Click to sign in and have a look at the project!<a>`;
	return htmlstring;
};