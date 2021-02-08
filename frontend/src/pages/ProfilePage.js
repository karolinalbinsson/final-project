import React, { useState } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SnackBarComponent from 'lib/SnackBarComponent';
import TemplateListItems from '../components/TemplateListItems';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AlertDialog from '../lib/AlertDialog';
import { deleteUser } from '../reducers/user';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const name = useSelector(store => store.user.login.name);
  const userId = useSelector(store => store.user.login.userId);
  const email = useSelector(store => store.user.login.email);
  const createdAt = useSelector(store => store.user.login.userCreatedAt);
  const allProjects = useSelector(store => store.user.project.createdProjects);
  const myProjects = allProjects.filter(item => item.creator._id === userId);

  console.log({ allProjects });
  console.log({ myProjects });
  /*
	useEffect(() => {
		dispatch(getSingleProject(projectId));
	}, [projectId, dispatch]);
*/
  const handleDelete = () => {
    dispatch(deleteUser());
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleAlert = () => {
    setOpenAlert(!openAlert);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {/* prop */}
            {<p>ProfilePage</p>}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <TemplateListItems />
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              {/* <Paper>
								<Avatar
									className={classes.large}
									alt="Cindy Baker"
									src="https://miro.medium.com/max/13440/1*NtrIiZxvi2d0Yoh_389Z_A.jpeg"
								/>
								<Typography variant="h4">Therese</Typography>
							</Paper> */}
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar
                      className={classes.large}
                      alt="Cindy Baker"
                      src="https://miro.medium.com/max/13440/1*NtrIiZxvi2d0Yoh_389Z_A.jpeg"
                    />
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
                          Member since:{' '}
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
            // projectName={projectTitle}
            // projectId={projectId}
          />
        )}
      </main>
    </div>
  );
  // return (
  //   <>
  //     {project && (
  //       <Card
  //         projectId={project[0]._id}
  //         projectTitle={project[0].projectName}
  //         createdAt={moment(project[0].createdAt).fromNow()}
  //         shortDescription={project[0].projectShortDescription}
  //         longDescription={project[0].projectLongDescription}
  //         usersInvited={project[0].usersInvited}
  //         creator={project[0].creator.name}
  //         updatedAt={moment(project[0].updatedAt).fromNow()}
  //       />
  //     )}
  //     {isDialogOpen && (
  //       <ProjectDialog
  //         projectId={project[0]._id}
  //         projectTitle={project[0].projectName}
  //         shortDescription={project[0].projectShortDescription}
  //         longDescription={project[0].projectLongDescription}
  //       />
  //     )}
  //   </>
  // );
};
export default ProfilePage;
