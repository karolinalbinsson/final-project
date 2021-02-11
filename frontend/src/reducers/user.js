import { createSlice } from "@reduxjs/toolkit";
import {
	USERS_URL,
	SESSIONS_URL,
	PROJECTS_URL,
	INVITE_URL,
	COMMENTS_URL,
} from "../urls";
import { createBrowserHistory } from "history";
import { ui } from "./ui";
//export const { enqueueSnackbar } = useSnackbar();
//import { useHistory } from 'react-router-dom';

export const browserHistory = createBrowserHistory();
//export const history = useHistory();

const initialState = {
	login: {
		name: localStorage.name || null,
		lastName: localStorage.lastName || null,
		userId: localStorage.userId || null,
		email: localStorage.email || null,
		profileImage: localStorage.profileImage || null,
		userCreatedAt: localStorage.userCreatedAt || null,
		errorMessage: null,
		accessToken: localStorage.accessToken || null,
		//Create
		isDialogCreateOpen: false,
		isDialogEditOpen: false,
		isDialogOpen: false,
	},
	project: {
		createdProjects: [], //byt namn till projects (projekt som vi har)
		singleProject: null,
		singleProjectId: null,
		lastCreatedProjectId: null,
		lastUpdatedProjectId: null,
		lastPostId: null,
		deletedProjects: null,
		invitedUsers: 0,
		invitedUserEmail: null,
		snackBarOpen: false,
		snackBarMessage: "Test message",
		snackBarSeverity: "success",
	},
};

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setName: (store, action) => {
			const { name } = action.payload;
			store.login.name = name;
			localStorage.setItem("name", name);
		},
		setLastName: (store, action) => {
			const { lastName } = action.payload;
			store.login.lastName = lastName;
			localStorage.setItem("lastName", lastName);
		},
		setUserId: (store, action) => {
			const { userId } = action.payload;
			store.login.userId = userId;
			//console.log({ userId });
			localStorage.setItem("userId", userId);
		},
		setEmail: (store, action) => {
			const { email } = action.payload;
			store.login.email = email;
			//console.log({ userId });
			localStorage.setItem("email", email);
		},
		setProfileImage: (store, action) => {
			const profileImage = action.payload;
			console.log("thunk", profileImage);
			store.login.profileImage = profileImage;
			localStorage.setItem("profileImage", profileImage);
		},
		setUserCreatedAt: (store, action) => {
			const { userCreatedAt } = action.payload;
			store.login.userCreatedAt = userCreatedAt;
			//console.log({ userId });
			localStorage.setItem("userCreatedAt", userCreatedAt);
		},
		setErrorMessage: (store, action) => {
			const { errorMessage } = action.payload;
			store.login.errorMessage = errorMessage;
		},
		resetErrorMessage: (store) => {
			store.login.errorMessage = null;
		},
		setAccessToken: (store, action) => {
			const { accessToken } = action.payload;
			store.login.accessToken = accessToken;
			localStorage.setItem("accessToken", accessToken);
		},
		//create project dialoge
		toggleCreateDialog: (store) => {
			store.login.isDialogCreateOpen = !store.login.isDialogCreateOpen;
		},
		//edit project dialoge
		toggleEditDialog: (store) => {
			store.login.isDialogEditOpen = !store.login.isDialogEditOpen;
		},
		toggleDialog: (store) => {
			store.login.isDialogOpen = !store.login.isDialogOpen;
		},
		setCreatedProjects: (store, action) => {
			const { createdProjects } = action.payload;
			store.project.createdProjects = createdProjects;
		},
		setSingleProject: (store, action) => {
			const { singleProject } = action.payload;
			store.project.singleProject = singleProject;
		},
		resetSingleProject: (store) => {
			store.project.singleProject = initialState.singleProject;
			///return { ...store, singleProject: null };
		},
		setSingleProjectId: (store, action) => {
			const singleProjectId = action.payload;
			store.project.singleProjectId = singleProjectId;
		},
		setLastCreatedProjectId: (store, action) => {
			const projectId = action.payload;
			store.project.lastCreatedProjectId = projectId;
		},
		setLastUpdatedProjectId: (store, action) => {
			const projectId = action.payload;
			store.project.lastUpdatedProjectId = projectId;
		},
		setLastPostId: (store, action) => {
			const postId = action.payload;
			store.project.lastPostId = postId;
		},
		setDeletedProjects: (store, action) => {
			const deletedCount = action.payload;
			store.project.deletedProjects = deletedCount;
		},
		setInitialState: () => {
			localStorage.clear();
			return initialState;
		},
		setInvitedUsers: (store) => {
			store.project.invitedUsers = store.project.invitedUsers + 1;
		},
		setLastInvitedUserEmail: (store, action) => {
			const email = action.payload;
			store.project.invitedUserEmail = email;
		},
		setSnackBar: (store, action) => {
			const snackBarInfo = action.payload;
			store.project.snackBarOpen = snackBarInfo.snackBarOpen;
			store.project.snackBarMessage = snackBarInfo.snackBarMessage;
			store.project.snackBarSeverity = snackBarInfo.snackBarSeverity;
		},
		setSnackBarOpen: (store, action) => {
			console.log("in setsnackbaropen", action.payload);
			const isOpen = action.payload;
			store.project.snackBarOpen = isOpen;
		},
		setSnackBarMessage: (store, action) => {
			const message = action.payload;
			store.project.snackBarMessage = message;
		},
		setSnackBarSeverity: (store, action) => {
			const severity = action.payload;
			store.project.snackBarSeverity = severity;
		},
	},
});

// Thunks

// Login
export const login = (email, password) => {
	return (dispatch) => {
		fetch(SESSIONS_URL, {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error(
					"Unable to sign in. Please check that e-mail and password are correct"
				);
			})

			.then((json) => {
				console.log("login", json);
				dispatch(user.actions.resetErrorMessage());
				dispatch(
					user.actions.setAccessToken({
						accessToken: json.accessToken,
					})
				);
				dispatch(user.actions.setUserId({ userId: json.userId }));
				dispatch(user.actions.setName({ name: json.name }));
				dispatch(user.actions.setLastName({ lastName: json.lastName }));
				dispatch(user.actions.setEmail({ email: json.email }));
				dispatch(
					user.actions.setProfileImage({ profileImage: json.image.imageUrl })
				);
				dispatch(
					user.actions.setUserCreatedAt({ userCreatedAt: json.createdAt })
				);
				browserHistory.push(`/dashboard`);
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.message,
						snackBarSeverity: "error",
					})
				);
			});
	};
};

// Sign up
export const signUp = (name, lastName, email, password) => {
	return (dispatch) => {
		fetch(USERS_URL, {
			method: "POST",
			body: JSON.stringify({ name, lastName, email, password }),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				if (res.ok) {
					//console.log(res);
					return res.json();
				} else if (res.status === 409) {
					throw new Error("User already exists.");
				}
				throw new Error("Could not create new user");
			})
			.then((json) => {
				dispatch(
					user.actions.setAccessToken({ accessToken: json.accessToken })
				);
				dispatch(user.actions.setUserId({ userId: json.userId }));
				dispatch(user.actions.setName({ name: json.name }));
				dispatch(user.actions.setLastName({ lastName: json.lastName }));
				dispatch(user.actions.setEmail({ email: json.email }));
				dispatch(
					user.actions.setUserCreatedAt({ userCreatedAt: json.createdAt })
				);
				dispatch(user.actions.setErrorMessage({ errorMessage: "" }));
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.message,
						snackBarSeverity: "error",
					})
				);
			});
	};
};

// Update user - add profile image
export const addProfileImage = (fileInput) => {
	return (dispatch, getStore) => {
		dispatch(ui.actions.setLoading(true));
		const userId = getStore().user.login.userId;
		const formData = new FormData();
		formData.append("image", fileInput.current.files[0]);
		fetch(`${USERS_URL}/${userId}`, {
			method: "PATCH",
			body: formData,
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("unable to add image");
				}
			})
			.then((json) => {
				dispatch(user.actions.setProfileImage(json.image.imageUrl));
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: "Image added!",
						snackBarSeverity: "success",
					})
				);
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.toString(),
						snackBarSeverity: "error",
					})
				);
			});
		dispatch(ui.actions.setLoading(false));
	};
};

// Logout
export const logout = () => {
	return (dispatch, getStore) => {
		const accessToken = getStore().user.login.accessToken;
		//console.log('access LOgout ', accessToken);
		fetch(`${USERS_URL}/logout`, {
			method: "POST",
			headers: { Authorization: accessToken },
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to logout");
				}
				localStorage.clear();
				dispatch(user.actions.setInitialState());
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
			});
	};
};

export const deleteUser = (userId) => {
	return (dispatch, getStore) => {
		dispatch(ui.actions.setLoading(true));
		const accessToken = getStore().user.login.accessToken;

		fetch(`${USERS_URL}/${userId}`, {
			method: "DELETE",
			//body: JSON.stringify({ userId: userId }),
			headers: { Authorization: accessToken },
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Could not delete user");
				}
				localStorage.clear();
				dispatch(user.actions.setInitialState());
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.toString(),
						snackBarSeverity: "error",
					})
				);
			});
		dispatch(ui.actions.setLoading(false));
	};
};

//GET one users own created / invited to projects
//ÄNDRA TILL PLURAL
export const getUserProjects = () => {
	return (dispatch, getStore) => {
		dispatch(ui.actions.setLoading(true));
		const accessToken = getStore().user.login.accessToken;
		//console.log('thunken', accessToken);
		//const userId = getStore().user.login.userId;
		//console.log('thunken', { userId });

		fetch(`${PROJECTS_URL}`, {
			method: "GET",
			headers: { Authorization: accessToken },
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Could not get projects.");
			})
			.then((json) => {
				console.log({ json });
				dispatch(
					user.actions.setCreatedProjects({
						createdProjects: json,
					})
				);
				dispatch(ui.actions.setLoading(false));
				//console.log(json);
			})

			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
				dispatch(ui.actions.setLoading(false));
			});
	};
};

//GET one single project based on projectID

//GET one users own created / invited to projects
export const getSingleProject = (projectId) => {
	return (dispatch, getStore) => {
		dispatch(ui.actions.setLoading(true));
		const accessToken = getStore().user.login.accessToken;
		//const projectId = getStore().user.project.userId;

		fetch(`${PROJECTS_URL}/${projectId}`, {
			method: "GET",
			headers: { Authorization: accessToken },
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Could not get single project.");
			})
			.then((json) => {
				console.log("singleProject", json);
				dispatch(
					user.actions.setSingleProject({
						singleProject: json,
					})
				);
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
			});
		dispatch(ui.actions.setLoading(false));
	};
};

//DELETE one project own created
export const deleteSingleProject = (projectId) => {
	console.log("ProjectID in delete single project", projectId);
	return (dispatch, getStore) => {
		dispatch(ui.actions.setLoading(true));
		const accessToken = getStore().user.login.accessToken;

		fetch(`${PROJECTS_URL}/${projectId}`, {
			method: "DELETE",
			//body: JSON.stringify({ userId: userId }),
			headers: { Authorization: accessToken },
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Could not delete this project.");
			})
			.then((json) => {
				//console.log('thunken', json);
				dispatch(user.actions.setDeletedProjects(json.deletedCount));
				dispatch(getUserProjects());
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: "Project deleted!",
						snackBarSeverity: "success",
					})
				);
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.toString(),
						snackBarSeverity: "error",
					})
				);
			});
		dispatch(ui.actions.setLoading(false));
	};
};

//Create new project
export const createNewProject = (
	projectName,
	projectShortDescription,
	projectLongDescription,
	fileInput
) => {
	return (dispatch, getStore) => {
		const accessToken = getStore().user.login.accessToken;
		const creator = getStore().user.login.userId;
		dispatch(ui.actions.setLoading(true));

		fetch(`${PROJECTS_URL}`, {
			method: "POST",
			body: JSON.stringify({
				creator,
				projectName,
				projectShortDescription,
				projectLongDescription,
			}),
			headers: {
				Authorization: accessToken,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Could not create project.");
			})
			.then((json) => {
				dispatch(user.actions.setLastCreatedProjectId(json.projectId));
			})
			.then(() => {
				const projectId = getStore().user.project.lastCreatedProjectId;
				const formData = new FormData();
				formData.append("image", fileInput[0]);

				fetch(`${PROJECTS_URL}/${projectId}/image`, {
					method: "PATCH",
					body: formData,
				}).then((res) => {
					dispatch(getUserProjects());
					dispatch(
						user.actions.setSnackBar({
							snackBarOpen: true,
							snackBarMessage: "Project created!",
							snackBarSeverity: "success",
						})
					);
					res.json();
				});
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);

				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.toString(),
						snackBarSeverity: "error",
					})
				);
			});
		dispatch(ui.actions.setLoading(false));
	};
};

//Update singleProject
export const updateProject = (
	projectName,
	projectShortDescription,
	projectLongDescription,
	projectId
) => {
	return (dispatch, getStore) => {
		const accessToken = getStore().user.login.accessToken;

		fetch(`${PROJECTS_URL}/${projectId}`, {
			method: "PATCH",
			body: JSON.stringify({
				projectName,
				projectShortDescription,
				projectLongDescription,
			}),
			headers: {
				Authorization: accessToken,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Could not update project.");
			})
			.then((json) => {
				dispatch(user.actions.setLastUpdatedProjectId(json.projectId));
				dispatch(getUserProjects());
				dispatch(user.actions.setSingleProjectId(null));
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: "Project updated!",
						snackBarSeverity: "success",
					})
				);
				//dispatch(user.action.setSingleProject(null));
				//dispatch(user.actions.resetSingleProject());
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.toString(),
						snackBarSeverity: "error",
					})
				);
			});
	};
};

//Invite friends to collaborate on project
export const inviteFriend = (toUserEmail, projectId) => {
	return (dispatch, getStore) => {
		const accessToken = getStore().user.login.accessToken;
		const fromUserId = getStore().user.login.userId;
		//console.log('thunken', fromUserId, projectId, toUserEmail);
		fetch(`${INVITE_URL}`, {
			method: "POST",
			body: JSON.stringify({
				fromUserId,
				toUserEmail,
				projectId,
			}),
			headers: {
				Authorization: accessToken,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else if (res.status === 409) {
					throw new Error("Friend has already been invited");
				} else {
					throw new Error("Could not invite friend.");
				}
			})
			.then((json) => {
				dispatch(user.actions.setInvitedUsers());
				dispatch(user.actions.setLastInvitedUserEmail(json.invitedUser));
				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: "Friend invited!",
						snackBarSeverity: "success",
					})
				);
			})
			.catch((err) => {
				console.log("error in thunk:", err);
				console.log("error message", err.message);
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);

				dispatch(
					user.actions.setSnackBar({
						snackBarOpen: true,
						snackBarMessage: err.message,
						snackBarSeverity:
							err.message === "Friend has already been invited"
								? "info"
								: "error",
					})
				);
			});
	};
};

export const addComment = (projectId, message, createdBy, fileInput) => {
	console.log("Start of addComment");
	return (dispatch, getStore) => {
		fetch(`${COMMENTS_URL}`, {
			method: "POST",
			body: JSON.stringify({ projectId, message, createdBy }),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Could not post comment");
			})

			.then((json) => {
				console.log("I then after result OK", json);
				dispatch(user.actions.setLastUpdatedProjectId(json.updatedProject._id));
				dispatch(user.actions.setLastPostId(json.post._id));
				//Flytta ner sen	dispatch(getSingleProject(projectId));
				// can this be done in another way?
				dispatch(user.actions.setErrorMessage({ errorMessage: "" }));
			})
			.then(() => {
				const postId = getStore().user.project.lastPostId;
				console.log("lastUpdatedProjectId:", projectId);
				console.log("In next then, fileinput");
				const formData = new FormData();
				console.log("formdata before append", formData);
				console.log("fileinput:", fileInput[0]);
				formData.append("image", fileInput[0]);
				console.log("formdata after append", formData);

				fetch(`${COMMENTS_URL}/${postId}`, {
					method: "PATCH",
					body: formData,
				}).then((res) => {
					console.log("done with patch");
					dispatch(getSingleProject(projectId));
					res.json();
				});
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
			});
	};
};

//Delete this thunk
export const addCommentTest = (projectId, message, createdBy, fileInput) => {
	console.log("Start of addCommentTEST");
	const formData = new FormData();
	console.log("formdata before append", formData);
	console.log("fileinput:", fileInput[0]);
	formData.append("image", fileInput[0]);
	console.log("formdata after first append", formData);
	formData.append("json", JSON.stringify({ projectId, message, createdBy }));
	console.log("formdata after second append", formData);
	return (dispatch) => {
		fetch("http://localhost:8080/commentimg", {
			method: "POST",
			body: {
				formData: formData,
			},
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("Could not post comment");
			})

			.then((json) => {
				console.log("I then after result OK", json);
				dispatch(user.actions.setLastUpdatedProjectId(json.projectId));
				dispatch(getSingleProject(projectId));
				// can this be done in another way?
				dispatch(user.actions.setErrorMessage({ errorMessage: "" }));
			})
			.catch((err) => {
				dispatch(
					user.actions.setErrorMessage({ errorMessage: err.toString() })
				);
			});
	};
};
