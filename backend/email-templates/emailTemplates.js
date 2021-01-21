//For creating some basic html to send to the user.
export const createHtmlInvite = (toUser, fromUser) => {
	let htmlstring = `<h2>Hey!</h2><br>`;
	htmlstring += `${fromUser} has invited you to collaborate on a project in project planner.<br>`;
	htmlstring += `<a href="https://www.google.se/signUp">Sign in or sign up and get access to the project<a>`;
	htmlstring += `<p> The link in plain text: https://www.google.se/signUp </p>`;
	return htmlstring;
};

export const createHtmlNotification = (userNameFor, fromUser) => {
	let htmlstring = `<h2>Hey ${userNameFor}!</h2><br>`;
	htmlstring += `${fromUser} has made updates on a project you are collaborating on.<br>`;
	htmlstring += `<a href="https://www.google.se/signUp">Sign in to check out the latest changes. <a>`;
	return htmlstring;
};
