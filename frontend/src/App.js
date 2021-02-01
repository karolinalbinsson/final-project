import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "./reducers/user";
import { ui } from "./reducers/ui";
import HomePage from "./pages/HomePage";

const reducer = combineReducers({ user: user.reducer, ui: ui.reducer });
const store = configureStore({ reducer });

export const App = () => {
	return (
		<Provider store={store}>
			<HomePage />
		</Provider>
	);
};

//vill vi ha olika routes beroende på login formulär eller signup formulär?
// Slå ihop createPage och EditPage (componenter)
// Göra TemplatePage reusable för alla sidor (titel och content props)
// Ev skissa på en kommentars komponent som läggs till i singleProject sidan
// Fixa alla knappar på TemaplatePage (invite, logout - redirect login, delete etc etc )
