import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import SnackBarComponent from 'lib/SnackBarComponent';
import AlertDialog from '../lib/AlertDialog';
import { deleteUser } from '../reducers/user';
import AvatarImage from '../lib/AvatarImage';
import { useProfileStyles, SmallAvatar, useMainStyles } from '../styles/Styles';
import Navigation from '../lib/Navigation';

const ProfilePage = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [file, setFile] = useState('');

  const classes = useMainStyles();
  const profileClasses = useProfileStyles();

  const dispatch = useDispatch();
  const name = useSelector(store => store.user.login.name);
  const lastName = useSelector(store => store.user.login.lastName);
  const userId = useSelector(store => store.user.login.userId);
  const email = useSelector(store => store.user.login.email);
  const createdAt = useSelector(store => store.user.login.userCreatedAt);
  const allProjects = useSelector(store => store.user.project.createdProjects);
  const myProjects = allProjects.filter(item => item.creator._id === userId);
  const profileImage = useSelector(store => store.user.login.profileImage);

  const handleDelete = () => {
    dispatch(deleteUser());
  };

  const toggleAlert = () => {
    setOpenAlert(!openAlert);
  };

  const initials = name
    .charAt(0)
    .toUpperCase()
    .concat(lastName.charAt(0).toUpperCase());

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
                  <Grid item>
                    <div className={profileClasses.avatarImage}>
                      <Badge
                        overlap="circle"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        badgeContent={
                          <>
                            <IconButton aria-label="change profile image">
                              <input
                                accept="image/*"
                                className={profileClasses.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={files => setFile(files)}
                              />
                              <label htmlFor="contained-button-file">
                                <SmallAvatar>
                                  <CameraAltIcon />
                                </SmallAvatar>
                              </label>
                            </IconButton>
                          </>
                        }
                      >
                        <AvatarImage
                          initials={initials}
                          className={profileClasses.large}
                          alt={'profile image'}
                          src={profileImage}
                        />
                      </Badge>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {name}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          {email}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Member since:
                          {moment(createdAt).format('MMMM Do YYYY')}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Collaborating in {allProjects.length} projects
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Created {myProjects.length} projects
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
          <SnackBarComponent />
        </Container>
        {openAlert && (
          <AlertDialog
            open={openAlert}
            handleClose={toggleAlert}
            handleDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
};
export default ProfilePage;
