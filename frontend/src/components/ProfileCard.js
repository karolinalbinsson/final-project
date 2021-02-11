import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { deleteUser, addProfileImage } from 'reducers/user';
import AlertDialog from '../lib/AlertDialog';
import AvatarImage from '../lib/AvatarImage';
import { useCardStyles, useProfileStyles, SmallAvatar } from '../styles/Styles';

const ProfileCard = ({
  name,
  lastName,
  email,
  createdAt,
  allProjects,
  myProjects,
  userId,
  initials,
}) => {
  const [anchorEl, setAnchorEl] = useState(null); //edit button högst upp
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useDispatch();
  const classes = useCardStyles();
  const profileClasses = useProfileStyles();
  const fileInput = useRef();
  const profileImage = useSelector(store => store.user.login.profileImage);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleAlert = () => {
    setOpenAlert(!openAlert);
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteUser(userId));
  };

  const testSubmit = () => {
    dispatch(addProfileImage(fileInput));
  };

  return (
    <>
      <div className={classes.root}>
        {openAlert && (
          <AlertDialog
            open={openAlert}
            handleClose={toggleAlert}
            handleDelete={handleDelete}
            name={name}
            deleteTitle="Delete account"
          />
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={9} className={classes.card}>
            <Card>
              <CardHeader
                align="center"
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
                      <MenuItem>Update profile</MenuItem>
                      <MenuItem>Change password</MenuItem>
                      <MenuItem onClick={toggleAlert}>Delete account</MenuItem>
                    </Menu>
                  </>
                }
                title={`${name} ${lastName}`}
              />

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
                          ref={fileInput}
                          onChange={event => testSubmit()}
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

              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  align="center"
                >
                  {email}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  align="center"
                >
                  Member since {moment(createdAt).format('MMMM Do YYYY')}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  align="center"
                >
                  Collaborating in {allProjects.length} projects
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  align="center"
                >
                  Created {myProjects.length} projects
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default ProfileCard;
