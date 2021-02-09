import { createSlice } from "@reduxjs/toolkit";

export const ui = createSlice({
	name: "ui",
	initialState: {
		isLoading: false,
	},

	reducers: {
		setLoading: (store, action) => {
			console.log("in ui setLoading payload:", action.payload);
			store.isLoading = action.payload;
		},
	},
});
