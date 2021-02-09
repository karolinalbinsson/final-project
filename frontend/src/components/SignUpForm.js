import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { signUp } from 'reducers/user';
import { useLogInStyles } from '../styles/Styles';

const SignUpForm = () => {
  const classes = useLogInStyles();
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const minimumPasswordLength = { minLength: 5 };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUp(name, lastName, email, password));
    setName('');
    setLastName('');
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              value={name}
              onChange={event => setName(event.target.value)}
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
            <TextField
              value={lastName}
              onChange={event => setLastName(event.target.value)}
              autoComplete="lname"
              name="lastName"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
            />
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
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                required={true}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!email || password.length < 5 || name < 2}
            >
              Sign Up
            </Button>
            {/* {errorMessage && <p>{errorMessage}</p>} */}
            <Grid container>
              <Grid item>
                <Link href="http://localhost:3000/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default SignUpForm;
