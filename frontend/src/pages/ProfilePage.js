import React from 'react';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import SnackBarComponent from 'lib/SnackBarComponent';
import { useMainStyles } from '../styles/Styles';
import Navigation from '../lib/Navigation';
import ProfileCard from '../components/ProfileCard';
import BackdropLoader from '../lib/BackdropLoader';

const ProfilePage = () => {
  const classes = useMainStyles();

  const name = useSelector(store => store.user.login.name);
  const lastName = useSelector(store => store.user.login.lastName);
  const userId = useSelector(store => store.user.login.userId);
  const email = useSelector(store => store.user.login.email);
  const createdAt = useSelector(store => store.user.login.userCreatedAt);
  const allProjects = useSelector(store => store.user.project.createdProjects);
  const myProjects = allProjects.filter(item => item.creator._id === userId);
  //const profileImage = useSelector(store => store.user.login.profileImage);

  const initials = name
    .charAt(0)
    .toUpperCase()
    .concat(lastName.charAt(0).toUpperCase());

  return (
    <div className={classes.root}>
      <Navigation pageHeader="Profile" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item xs={12} md={9} lg={6}>
              <ProfileCard
                name={name}
                lastName={lastName}
                email={email}
                createdAt={createdAt}
                allProjects={allProjects}
                myProjects={myProjects}
                userId={userId}
                initials={initials}
              />
            </Grid>
          </Grid>
          <SnackBarComponent />
          <BackdropLoader />
        </Container>
      </main>
    </div>
  );
};
export default ProfilePage;
