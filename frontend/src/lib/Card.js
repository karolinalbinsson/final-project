import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//dialog
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

//Edit project menu
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  deleteSingleProject,
  inviteFriend,
  user,
  getSingleProject,
} from 'reducers/user';

import AlertDialog from '../lib/AlertDialog';
import AvatarImage from '../lib/AvatarImage';

import { useCardStyles } from '../styles/Styles';

const ProjectCard = ({
  projectTitle,
  createdAt,
  shortDescription,
  projectId,
  longDescription,
  usersInvited,
  creator,
  updatedAt,
  linkTo,
  imageUrl,
  invitedUsersEmail,
}) => {
  const [expanded, setExpanded] = useState(false); //more info of project
  const [open, setOpen] = useState(false); //sharebutton
  const [anchorEl, setAnchorEl] = useState(null); //edit button högst upp
  const [email, setEmail] = useState(''); //invite button
  const [openAlert, setOpenAlert] = useState(false);
  const defaultUrl =
    'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80';
  const deletedProjectId = useSelector(
    store => store.user.project.deletedProjects
  );
  const emailList = usersInvited.map(data => data.email);
  const pendingInvites = invitedUsersEmail.filter(
    email => !emailList.includes(email)
  );
  console.log('Active members:', emailList);
  console.log('Pending:', pendingInvites);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useCardStyles();
  //const avatarClasses = useProfileStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInvite = email => {
    dispatch(inviteFriend(email, projectId));
    setEmail('');
  };

  const toggleInviteButton = () => {
    setOpen(!open);
    handleClose();
  };

  const handleDelete = projectId => {
    dispatch(deleteSingleProject(projectId));
  };

  //edit project button
  const handleEditDialog = () => {
    dispatch(user.actions.resetSingleProject());
    dispatch(user.actions.setSingleProjectId(projectId));
    dispatch(user.actions.toggleEditDialog());
    handleClose();
  };

  const toggleAlert = () => {
    setOpenAlert(!openAlert);
  };

  return (
    <>
      <div className={classes.root}>
        {openAlert && (
          <AlertDialog
            open={openAlert}
            handleClose={toggleAlert}
            handleDelete={handleDelete}
            projectName={projectTitle}
            projectId={projectId}
          />
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.card}>
            <Card>
              <CardHeader
                action={
                  <>
                    <IconButton aria-label="settings" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleEditDialog()}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={toggleInviteButton}>Invite</MenuItem>
                      <MenuItem
                        //onClick={() => handleDelete(projectId)}
                        onClick={toggleAlert}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
                }
                title={projectTitle}
                subheader={`Created by: ${creator}, ${createdAt}`}
              />
              {linkTo ? (
                <Link to={linkTo}>
                  <CardMedia
                    className={classes.media}
                    //image="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                    image={imageUrl ? imageUrl : defaultUrl}
                    title="My first project"
                  />
                </Link>
              ) : (
                <CardMedia
                  className={classes.media}
                  //	image="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                  image={imageUrl ? imageUrl : defaultUrl}
                  title="My first project"
                />
              )}

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {shortDescription}.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="share" onClick={toggleInviteButton}>
                  <ShareIcon />
                  <Dialog
                    open={open}
                    onClose={toggleInviteButton}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Invite</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To invite friends to collaborate on this project, please
                        enter their email address here.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={toggleInviteButton} variant="outlined">
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleInvite(email)}
                        variant="contained"
                        color="primary"
                      >
                        Invite
                      </Button>
                    </DialogActions>
                  </Dialog>
                </IconButton>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  {updatedAt && (
                    <Typography variant="subtitle1">
                      Updated: {updatedAt}
                    </Typography>
                  )}
                  <Typography paragraph>{longDescription}</Typography>
                  {usersInvited.length > 0 && (
                    <>
                      <Typography variant="subtitle1">
                        Project Members:
                      </Typography>
                      <AvatarGroup max={4}>
                        {usersInvited.map(user => (
                          <AvatarImage
                            key={user.email}
                            initials={user.name
                              .charAt(0)
                              .toUpperCase()
                              .concat(user.lastName.charAt(0).toUpperCase())}
                            className={classes.small}
                            //alt={name}
                            alt={'profile image'}
                            src={user.image.imageUrl}
                          />
                        ))}
                      </AvatarGroup>
                    </>
                  )}
                  {pendingInvites.length > 0 && (
                    <>
                      <Typography variant="subtitle1">
                        Pending invites:
                      </Typography>
                      {pendingInvites.map(emailAddress => (
                        <Typography key={emailAddress} paragraph>
                          {emailAddress}
                        </Typography>
                      ))}
                    </>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </div>
      {deletedProjectId && <Redirect to={`/dashboard`} />}
    </>
  );
};
export default ProjectCard;
