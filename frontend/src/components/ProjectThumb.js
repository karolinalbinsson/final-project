// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';

// import clsx from 'clsx';
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// //dialog
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// //Edit project menu
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

// import { deleteSingleProject, inviteFriend } from 'reducers/user';
// import { useProjectThumbStyles } from '../styles/Styles';

// const ProjectThumb = ({
//   projectTitle,
//   createdAt,
//   longDescription,
//   shortDescription,
//   projectId,
// }) => {
//   const [expanded, setExpanded] = useState(false); //more info of project
//   const [open, setOpen] = useState(false); //sharebutton
//   const [anchorEl, setAnchorEl] = useState(null); //edit button högst upp
//   const [email, setEmail] = useState(''); //invite button

//   const history = useHistory();
//   const dispatch = useDispatch();
//   const classes = useProjectThumbStyles();

//   //Open action menu
//   const handleClick = event => {
//     setAnchorEl(event.currentTarget);
//   };

//   //Close action menu
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   //Toggle more info about project
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const toggleShareButton = () => {
//     setOpen(!open);
//   };

//   const handleDelete = projectId => {
//     dispatch(deleteSingleProject(projectId));
//   };

//   const handleInvite = email => {
//     dispatch(inviteFriend(email, projectId));
//   };

//   const handleEdit = projectId => {
//     history.push(`/editproject/${projectId}`);
//   };

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} className={classes.card}>
//           <Card>
//             <CardHeader
//               action={
//                 <>
//                   <IconButton aria-label="settings" onClick={handleClick}>
//                     <MoreVertIcon />
//                   </IconButton>

//                   <Menu
//                     id="simple-menu"
//                     anchorEl={anchorEl}
//                     keepMounted
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                   >
//                     <MenuItem onClick={() => handleEdit(projectId)}>
//                       Edit
//                     </MenuItem>
//                     <MenuItem onClick={toggleShareButton}>Invite</MenuItem>
//                     <MenuItem onClick={() => handleDelete(projectId)}>
//                       Delete
//                     </MenuItem>
//                   </Menu>
//                 </>
//               }
//               title={projectTitle}
//               subheader={createdAt}
//             />
//             <Link to={`/project/${projectId}`}>
//               <CardMedia
//                 className={classes.media}
//                 image="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
//                 title="My first project"
//               />
//             </Link>

//             <CardContent>
//               <Typography variant="body2" color="textSecondary" component="p">
//                 {shortDescription}.
//               </Typography>
//             </CardContent>
//             <CardActions disableSpacing>
//               <IconButton aria-label="share" onClick={toggleShareButton}>
//                 <ShareIcon />
//                 <Dialog
//                   open={open}
//                   onClose={toggleShareButton}
//                   aria-labelledby="form-dialog-title"
//                 >
//                   <DialogTitle id="form-dialog-title">Invite</DialogTitle>
//                   <DialogContent>
//                     <DialogContentText>
//                       To invite friends to collaborate on this project, please
//                       enter their email address here.
//                     </DialogContentText>
//                     <TextField
//                       autoFocus
//                       margin="dense"
//                       id="name"
//                       label="Email Address"
//                       type="email"
//                       fullWidth
//                       value={email}
//                       onChange={event => setEmail(event.target.value)}
//                     />
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={toggleShareButton} variant="outlined">
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={() => handleInvite(email)}
//                       variant="contained"
//                       color="primary"
//                     >
//                       Invite
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </IconButton>
//               <IconButton
//                 className={clsx(classes.expand, {
//                   [classes.expandOpen]: expanded,
//                 })}
//                 onClick={handleExpandClick}
//                 aria-expanded={expanded}
//                 aria-label="show more"
//               >
//                 <ExpandMoreIcon />
//               </IconButton>
//             </CardActions>
//             <Collapse in={expanded} timeout="auto" unmountOnExit>
//               <CardContent>
//                 <Typography paragraph>{longDescription}</Typography>
//               </CardContent>
//             </Collapse>
//           </Card>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
// export default ProjectThumb;
