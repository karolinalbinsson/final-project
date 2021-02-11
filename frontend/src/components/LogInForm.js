import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { WEB_URL } from '../urls';
import { login } from '../reducers/user';
import { useLogInStyles } from '../styles/Styles';

const LogInForm = () => {
  const classes = useLogInStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const minimumPasswordLength = { minLength: 5 };
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
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div className={classes.information}>
          <Typography
            component="p"
            variant="subtitle1"
            className={classes.informationText}
          >
            Save your plans in your own project planner dashboard. Sign up and
            start your planning. Keep it to yourself or invite friends to
            collaborate.
          </Typography>
        </div>
      </Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              disabled={!email || password.length < 5}
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
                <Link href={`${WEB_URL}signUp`} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <div className={classes.informationMobile}>
          <Typography
            component="p"
            variant="subtitle1"
            className={classes.informationTextMobile}
          >
            Save your plans in your own project planner dashboard. Sign up and
            start your planning. Keep it to yourself or invite friends to
            collaborate.
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};
export default LogInForm;
