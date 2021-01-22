import { createSlice } from '@reduxjs/toolkit';
import { USERS_URL, SESSIONS_URL } from '../urls';
import { createBrowserHistory } from 'history';
//import { useHistory } from 'react-router-dom';

export const browserHistory = createBrowserHistory();
//export const history = useHistory();

const initialState = {
  login: {
    name: '',
    userId: 0,
    errorMessage: '',
    accessToken: null,
    isLogIn: true,
  },
  project: {
    createdProjects: [],
    singleProject: null,
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
      console.log({ userId });
      localStorage.setItem('userId', userId);
    },
    setErrorMessage: (store, action) => {
      const { errorMessage } = action.payload;
      store.login.errorMessage = errorMessage;
    },
    setAccessToken: (store, action) => {
      const { accessToken } = action.payload;
      store.login.accessToken = accessToken;
      console.log('reducer', accessToken);
      localStorage.setItem('accessToken', accessToken);
    },
    toggleForm: (store, action) => {
      store.login.isLogIn = action.payload;
    },
    setCreatedProjects: (store, action) => {
      const { createdProjects } = action.payload;
      store.project.createdProjects = createdProjects;
    },
    setSingleProject: (store, action) => {
      const { singleProject } = action.payload;
      store.project.singleProject = singleProject;
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
        console.log(json);

        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setName({ name: json.name }));
        browserHistory.push(`/dashboard/${json.userId}`);
        //history.push(`/dashboard/${json.userId}`);
      })
      // .then(json => {
      //   browserHistory.push(`/dashboard/${json.userId}`);
      //   console.log('hej hej');
      // })
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
          console.log(res);
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
        browserHistory.push(`/dashboard/${json.userId}`);
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
    dispatch(user.actions.setName({ name: '' }));
    dispatch(user.actions.setUserId({ userId: 0 }));
    dispatch(user.actions.setErrorMessage({ errorMessage: '' }));
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    localStorage.clear();
  };
};

//GET one users own created / invited to projects
export const getUserProject = () => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    //console.log('thunken', accessToken);
    const userId = getStore().user.login.userId;
    //console.log('thunken', { userId });

    fetch(`http://localhost:8080/projects/${userId}`, {
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
        console.log(json);
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

    fetch(`http://localhost:8080/projects/${projectId}/project`, {
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
        console.log(json);
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
    const userId = getStore().user.login.userId;
    console.log('delete', userId);

    fetch(`http://localhost:8080/projects/${projectId}/project`, {
      method: 'DELETE',
      body: JSON.stringify({ userId: userId }),
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not delete this project.');
      })
      .then(json => {
        console.log(json);
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};
