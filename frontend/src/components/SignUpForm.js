import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
//import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { signUp } from 'reducers/user';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const minimumPasswordLength = { minLength: 5 };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUp(name, email, password));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                value={name}
                onChange={event => setName(event.target.value)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={event => setEmail(event.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required={true}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'} //changed when icon is clicked
                  value={password}
                  fullWidth={true}
                  onChange={event => setPassword(event.target.value)}
                  inputProps={minimumPasswordLength}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {/* toggles */}
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              {/* <TextField
                value={password}
                onChange={event => setPassword(event.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> */}
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          {errorMessage && <p>{errorMessage}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!email || password.length < 5 || name < 2}
            //onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="http://localhost:3000/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
};
export default SignUpForm;

// import React, { useState } from 'react';
// import { signUp } from 'reducers/user';
// import { useDispatch, useSelector } from 'react-redux';

// import CustomButton from '../lib/CustomButton';
// import { user } from '../reducers/user';

// //import '../styles/style.css';

// const SignUpForm = () => {
//   const dispatch = useDispatch();
//   const errorMessage = useSelector(store => store.user.login.errorMessage);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignedUp, setIsSignedUp] = useState(false);

//   const handleSubmit = event => {
//     event.preventDefault();
//     dispatch(signUp(name, email, password));
//     setName('');
//     setEmail('');
//     setPassword('');
//   };

//   // const handleSetSignUp = event => {
//   //   event.preventDefault();
//   //   setIsSignedUp(false);
//   // };
//   const handleSetForm = () => {
//     dispatch(user.actions.toggleForm(true));
//   };

//   return (
//     <form className="content" onSubmit={handleSubmit}>
//       <div className="form-text-input-fields">
//         <label>
//           <input
//             className="text-input-field"
//             required
//             type="text"
//             value={name}
//             minLength={2}
//             placeholder="Type your name"
//             onChange={event => setName(event.target.value)}
//           ></input>
//         </label>
//         <label>
//           <input
//             className="text-input-field"
//             required
//             type="email"
//             value={email}
//             placeholder="email@email.com"
//             onChange={event => setEmail(event.target.value)}
//           ></input>
//         </label>
//         <label>
//           <input
//             className="text-input-field"
//             required
//             type="password"
//             value={password}
//             minLength={5}
//             placeholder="password"
//             onChange={event => setPassword(event.target.value)}
//           ></input>
//         </label>
//       </div>
//       <div className="form-buttons">
//         <CustomButton
//           className={
//             !name || !email || password.length < 5
//               ? 'form-button-disabled'
//               : 'form-button'
//           }
//           type="submit"
//           disabled={!name || !email || password.length < 5}
//           text="Sign Up"
//         />
//         <button className="link-button" type="button" onClick={handleSetForm}>
//           <span className="link-button-text">
//             Already a member? Log in here
//           </span>
//         </button>
//         {errorMessage && <p className="text-info error">{errorMessage}</p>}
//       </div>
//     </form>
//   );
// };
// export default SignUpForm;
