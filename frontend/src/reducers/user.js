import { createSlice } from '@reduxjs/toolkit';
import { USERS_URL, SESSIONS_URL } from '../urls';
import { createBrowserHistory } from 'history';
//import { useHistory } from 'react-router-dom';

export const browserHistory = createBrowserHistory();
//export const history = useHistory();

const initialState = {
  login: {
    name: localStorage.name || null,
    userId: localStorage.userId || null,
    errorMessage: null,
    accessToken: localStorage.accessToken || null,
  },
  project: {
    createdProjects: [], //byt namn till projects (projekt som vi har)
    singleProject: null,
    lastCreatedProjectId: null,
    lastUpdatedProjectId: null,
    invitedUsers: 0,
    invitedUserEmail: null,
  },
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (store, action) => {
      const { name } = action.payload;
      store.login.name = name;
      localStorage.setItem('name', name);
    },
    setUserId: (store, action) => {
      const { userId } = action.payload;
      store.login.userId = userId;
      //console.log({ userId });
      localStorage.setItem('userId', userId);
    },
    setErrorMessage: (store, action) => {
      const { errorMessage } = action.payload;
      store.login.errorMessage = errorMessage;
    },
    resetErrorMessage: store => {
      store.login.errorMessage = null;
    },
    setAccessToken: (store, action) => {
      const { accessToken } = action.payload;
      store.login.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
    setCreatedProjects: (store, action) => {
      const { createdProjects } = action.payload;
      store.project.createdProjects = createdProjects;
    },
    setSingleProject: (store, action) => {
      const { singleProject } = action.payload;
      store.project.singleProject = singleProject;
    },
    setLastCreatedProjectId: (store, action) => {
      const projectId = action.payload;
      store.project.lastCreatedProjectId = projectId;
    },
    setLastUpdatedProjectId: (store, action) => {
      const projectId = action.payload;
      store.project.lastUpdatedProjectId = projectId;
    },
    setInitialState: () => {
      return initialState;
    },
    setInvitedUsers: store => {
      store.project.invitedUsers = store.project.invitedUsers + 1;
    },
    setLastInvitedUserEmail: (store, action) => {
      const email = action.payload;
      store.project.invitedUserEmail = email;
    },
  },
});

// Thunks

// Login
export const login = (email, password) => {
  return dispatch => {
    fetch(SESSIONS_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(
          'Unable to sign in. Please check that e-mail and password are correct'
        );
      })
      .then(json => {
        dispatch(user.actions.resetErrorMessage());
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setName({ name: json.name }));
        browserHistory.push(`/dashboard`);
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

// Sign up
export const signUp = (name, email, password) => {
  return dispatch => {
    fetch(USERS_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          //console.log(res);
          return res.json();
        } else if (res.status === 409) {
          throw new Error('User already exists.');
        }
        throw new Error('Could not create new user');
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({ accessToken: json.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setName({ name: json.name }));
        // can this be done in another way?
        dispatch(user.actions.setErrorMessage({ errorMessage: '' }));
        //browserHistory.push(`/dashboard/${json.userId}`);
        browserHistory.push(`/dashboard`);
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

// Logout
export const logout = () => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    //console.log('access LOgout ', accessToken);
    fetch(`${USERS_URL}/logout`, {
      method: 'POST',
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to logout');
        }
        return res.json();
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
    dispatch(user.actions.setInitialState());
    browserHistory.push(`/`);
    localStorage.clear();
  };
};

//GET one users own created / invited to projects
//ÄNDRA TILL PLURAL
export const getUserProjects = () => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    //console.log('thunken', accessToken);
    //const userId = getStore().user.login.userId;
    //console.log('thunken', { userId });

    fetch(`http://localhost:8080/projects`, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not get projects.');
      })
      .then(json => {
        dispatch(
          user.actions.setCreatedProjects({
            createdProjects: json,
          })
        );
        //console.log(json);
      })

      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

//GET one single project based on projectID

//GET one users own created / invited to projects
export const getSingleProject = projectId => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    //const projectId = getStore().user.project.userId;

    fetch(`http://localhost:8080/projects/${projectId}`, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not get single project.');
      })
      .then(json => {
        dispatch(
          user.actions.setSingleProject({
            singleProject: json,
          })
        );
        //console.log(json);
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

//DELETE one project own created
export const deleteSingleProject = projectId => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    //const userId = getStore().user.login.userId;
    //console.log('delete', userId);

    fetch(`http://localhost:8080/projects/${projectId}`, {
      method: 'DELETE',
      //body: JSON.stringify({ userId: userId }),
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not delete this project.');
      })
      .then(json => {
        dispatch(getUserProjects());
        //console.log(json);
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

//Create new project
export const createNewProject = (
  projectName,
  projectShortDescription,
  projectLongDescription
) => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    const creator = getStore().user.login.userId;

    fetch('http://localhost:8080/projects', {
      method: 'POST',
      body: JSON.stringify({
        creator,
        projectName,
        projectShortDescription,
        projectLongDescription,
      }),
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not create project.');
      })
      .then(json => {
        dispatch(user.actions.setLastCreatedProjectId(json.projectId));
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
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

    fetch(`http://localhost:8080/projects/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        projectName,
        projectShortDescription,
        projectLongDescription,
      }),
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not update project.');
      })
      .then(json => {
        dispatch(user.actions.setLastUpdatedProjectId(json.projectId));
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
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
    fetch('http://localhost:8080/inviteUser', {
      method: 'POST',
      body: JSON.stringify({
        fromUserId,
        toUserEmail,
        projectId,
      }),
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          //console.log('then i if statement');
          return res.json();
          //return res.json();
        } else {
          throw new Error('Could not invite friend.');
        }
      })
      .then(json => {
        dispatch(user.actions.setInvitedUsers());
        dispatch(user.actions.setLastInvitedUserEmail(json.invitedUser));
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};
