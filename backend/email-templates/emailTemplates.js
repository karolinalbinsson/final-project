//For creating some basic html to send to the user.
export const createHtmlInvite = (fromUser) => {
	let htmlstring = `<h2>Hey!</h2><br>`;
	htmlstring += `${fromUser} has invited you to collaborate on a project in Project Planner.<br>`;
	htmlstring += `<a href="https://project-planner-tsk.netlify.app/">Sign in or sign up and get access to the project!<a>`;
	return htmlstring;
};
