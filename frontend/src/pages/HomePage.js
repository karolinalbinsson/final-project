import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { teal, blueGrey } from "@material-ui/core/colors";
import LogInForm from "../components/LogInForm";
import SignUpForm from "../components/SignUpForm";
import ProjectPage from "./ProjectPage";
import DashboardPage from "./DashboardPage";
import ProfilePage from "./ProfilePage";
import SnackBarComponent from "lib/SnackBarComponent";

const HomePage = () => {
	const accessToken = useSelector((store) => store.user.login.accessToken);
	const isDarkMode = useSelector((store) => store.user.login.isDarkMode);
	const palletType = isDarkMode ? "dark" : "light";

	const theme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {
				main: palletType === "dark" ? blueGrey[500] : teal[400],
			},
			secondary: {
				main: palletType === "dark" ? blueGrey[100] : teal[600],
			},
		},
	});

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Switch>
					<Route exact path="/">
						<Redirect to="/logIn" />
					</Route>
					<Route exact path="/logIn">
						{accessToken ? <Redirect to="/dashboard/" /> : <LogInForm />}
					</Route>
					<Route exact path="/signUp">
						{accessToken ? <Redirect to="/dashboard/" /> : <SignUpForm />}
					</Route>
					<Route exact path="/dashboard/">
						{!accessToken ? <Redirect to="/logIn" /> : <DashboardPage />}
					</Route>
					<Route exact path="/project/:projectId">
						{!accessToken ? <Redirect to="/logIn" /> : <ProjectPage />}
					</Route>
					<Route exact path="/myProfile/">
						{!accessToken ? <Redirect to="/logIn" /> : <ProfilePage />}
					</Route>
				</Switch>
				<SnackBarComponent />
			</ThemeProvider>
		</BrowserRouter>
	);
};
export default HomePage;
