import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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

//Edit project menu
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
      width: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

const ProjectThumb = ({ projectTitle, createdAt, description }) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false); //sharebutton
  const [anchorEl, setAnchorEl] = useState(false); //Prickarna högst upp till höger

  console.log('edit project', anchorEl);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleShareButton = () => {
    setOpen(!open);
  };

  const toggleEditButton = () => {
    setAnchorEl(!anchorEl);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.card}>
          <Card>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon onClick={toggleEditButton} />
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={toggleEditButton}
                  >
                    <MenuItem onClick={toggleEditButton}>Edit</MenuItem>
                    <MenuItem onClick={toggleEditButton}>Invite</MenuItem>
                    <MenuItem onClick={toggleEditButton}>Delete</MenuItem>
                  </Menu>
                </IconButton>
              }
              title={projectTitle}
              subheader={createdAt}
            />
            <CardMedia
              className={classes.media}
              image="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
              title="My first project"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="share">
                <ShareIcon onClick={toggleShareButton} />
                <Dialog
                  open={open}
                  onClose={toggleShareButton}
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
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={toggleShareButton} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={toggleShareButton} color="primary">
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
                <Typography paragraph>Detailed information:</Typography>
                <Typography paragraph>
                  This is some more information of the project.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProjectThumb;

// import React from 'react';

// /**
//  * infinitescroll
//  */
// const ProjectThumb = ({ projectTitle, createdAt, description }) => {
//   return (
//     <article>
//       <h2>{projectTitle}</h2>
//       <p>{createdAt}</p>
//       <p>{description}</p>
//     </article>
//   );
// };
// export default ProjectThumb;
