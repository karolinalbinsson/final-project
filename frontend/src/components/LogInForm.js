import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { login } from '../reducers/user';
import { user } from '../reducers/user';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const minimumPasswordLength = { minLength: 5 };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={email}
              onChange={event => setEmail(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              value={password}
              onChange={event => setPassword(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="http://localhost:3000/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TextField from '@material-ui/core/TextField';
// import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import { login } from '../reducers/user';
// import { user } from '../reducers/user';
// import SignUpForm from './SignUpForm';
// import CustomButton from '../lib/CustomButton';
// //import '../styles/style.css';

// const LoginForm = () => {
//   const dispatch = useDispatch();
//   const errorMessage = useSelector(store => store.user.login.errorMessage);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   //const [isLogin, setIsLoginn] = useState(true);

//   const validEmail = { pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$' };
//   const minimumPasswordLength = { minLength: 5 };

//   // Toggle password visibility
//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   const handleSubmit = event => {
//     event.preventDefault();
//     dispatch(login(email, password));
//     setEmail('');
//     setPassword('');
//   };

//   // const handleSetLogin = event => {
//   //   event.preventDefault();
//   //   setIsLogin(false);
//   // };

//   const handleSetForm = () => {
//     dispatch(user.actions.toggleForm(false));
//   };

//   return (
//     <main className="main-container">
//       <form className="content" onSubmit={handleSubmit}>
//         <div className="form-text-input-fields">
//           <TextField
//             required
//             id="standard-required" //adds *
//             label="Email"
//             inputProps={validEmail}
//             value={email}
//             onChange={event => setEmail(event.target.value)}
//             helperText={email === '' ? 'email@email.com' : ' '}
//           />
//           {/* <label>
//             <input
//               className="text-input-field"
//               required
//               type="email"
//               value={email}
//               placeholder="email@email.com"
//               onChange={event => setEmail(event.target.value)}
//             ></input>
//           </label> */}
//           <FormControl>
//             <InputLabel htmlFor="standard-adornment-password">
//               Password*
//             </InputLabel>
//             <Input
//               required={true}
//               id="standard-adornment-password"
//               type={showPassword ? 'text' : 'password'} //changed when icon is clicked
//               value={password}
//               fullWidth={true}
//               onChange={event => setPassword(event.target.value)}
//               inputProps={minimumPasswordLength}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                   >
//                     {/* toggles */}
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//           </FormControl>

//           {/* <label>
//             <input
//               className="text-input-field"
//               required
//               type="password"
//               value={password}
//               placeholder="password"
//               onChange={event => setPassword(event.target.value)}
//             ></input>
//           </label> */}
//         </div>
//         <div className="form-buttons">
//           <CustomButton
//             variant="contained"
//             color="primary"
//             size="large"
//             type="submit"
//             disabled={!email || password.length < 5}
//             text="Login"
//             onClick={handleSubmit}

//             // className={
//             //   !email || password.length < 5
//             //     ? 'form-button-disabled'
//             //     : 'form-button'
//             // }
//             // type="submit"
//             // disabled={!email || password.length < 5}
//             // text="Login"
//           />
//           {errorMessage && <p className="text-info error">{errorMessage}</p>}
//           <button className="link-button" type="button" onClick={handleSetForm}>
//             <span className="link-button-text">Not a member? Sign up here</span>
//           </button>
//         </div>
//       </form>
//     </main>
//   );
// };
// export default LoginForm;
