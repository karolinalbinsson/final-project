import React from 'react';

import Navigation from '../lib/Navigation';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));
const TestPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navigation />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item></Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          Sara
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Sara
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Member since today
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Collaborating in projects
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Created projects
                        </Typography>
                      </Grid>
                      <Button variant="outlined" color="secondary">
                        Delete my account
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default TestPage;
