import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import DashboardPage from "./DashboardPage";
import ProjectPage from "./ProjectPage";
import CreateProjectPage from "./CreateProjectPage";

const HomePage = () => {
	const accessToken = useSelector((store) => store.user.login.accessToken);
	//console.log(accessToken);
	//const userId = useSelector(store => store.user.login.userId);
	//console.log(userId);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Redirect to="/logIn" />
				</Route>
				<Route exact path="/logIn">
					{/* <LogInForm /> */}
					{accessToken ? <Redirect to="/dashboard/" /> : <LogInForm />}
				</Route>
				<Route exact path="/signUp">
					{accessToken ? <Redirect to="/dashboard/" /> : <SignUpForm />}
				</Route>
				<Route exact path="/dashboard/">
					<DashboardPage />
				</Route>
				<Route exact path="/project/:projectId">
					<ProjectPage />
				</Route>
				<Route exact path="/createproject/">
					<CreateProjectPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};
export default HomePage;
