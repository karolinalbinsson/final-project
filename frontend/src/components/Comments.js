import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import moment from 'moment';

import { ListItem } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';

import SendIcon from '@material-ui/icons/Send';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';

import { addComment } from 'reducers/user';
import { useCommentsStyles } from '../styles/Styles';
import { useProfileStyles } from '../styles/Styles';
import Chip from '@material-ui/core/Chip';

const Comments = ({ projectId, posts }) => {
  //If we write a sentence that contains an url, is there any way to extract only the url??
  const dispatch = useDispatch();
  const classes = useCommentsStyles();
  const iconClasses = useProfileStyles();
  const singleProjectId = projectId;
  const loggedInUser = useSelector(store => store.user.login.userId);
  const regexContainsUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim;
  const isDarkMode = useSelector(store => store.user.login.isDarkMode);
  const fileInput = useRef();

  const [messageText, setMessageText] = useState('');
  const [imageAttached, setImageAttached] = useState(false);
  //	const [messageUpdate, setMessageUpdate] = useState(0);
  //const [dropzoneOpen, setDropzoneOpen] = useState(false);
  //const [key, setKey] = useState(0);
  //const [file, setFile] = useState([]);
  //const [debounceKey] = useDebounce(key, 1000);

  const handleSubmitComment = () => {
    dispatch(addComment(singleProjectId, messageText, loggedInUser, fileInput));
    //	setDropzoneOpen(false);
    //setKey(key + 1);
    setMessageText('');
    //setFile("");
    //setMessageUpdate(messageUpdate + 1);
  };

  useEffect(() => {
    deleteImage();
    scrollToBottom();
  }, [posts]);

  // const toggleDropZone = () => {
  // 	setDropzoneOpen(!dropzoneOpen);
  // };

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'list',
    });
  };

  const handleImageChange = () => {
    setImageAttached(true);
    console.log('image added', fileInput);
  };

  const deleteImage = () => {
    fileInput.current.value = '';
    setImageAttached(false);
    console.log('after delete', fileInput);
  };

  return (
    <>
      {/* <Grid item md={5} xs={12}>
        <Paper>
          <List id="list" className={classes.messageArea}>
            {posts.map((post, index) => (
              <ListItem
                key={post._id}
                autoFocus={index === posts.length - 1 ? true : false}
                className={
                  post.createdBy._id === loggedInUser
                    ? classes.alignRight
                    : classes.alignLeft
                }
              >
                <Grid
                  item
                  xs={9}
                  md={10}
                  container
                  className={
                    post.createdBy._id === loggedInUser
                      ? isDarkMode
                        ? classes.myMessageBubbleDark
                        : classes.myMessageBubbleLight
                      : isDarkMode
                      ? classes.messageBubbleDark
                      : classes.messageBubbleLight
                  }
                >
                  <Grid item>
                    <>
                      {post.image.imageUrl !== '' ? (
                        <>
                          <img
                            alt="comment"
                            className={classes.postImage}
                            src={post.image.imageUrl}
                          />
                          {post.message.match(regexContainsUrl) ? (
                            <Typography
                              variant="body2"
                              className={classes.root}
                            >
                              <a
                                href={
                                  post.message
                                    .match(regexContainsUrl)[0]
                                    .startsWith('http')
                                    ? post.message.match(regexContainsUrl)[0]
                                    : `//${
                                        post.message.match(regexContainsUrl)[0]
                                      }`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {post.message}
                              </a>
                            </Typography>
                          ) : (
                            <Typography variant="body2" align="left">
                              {post.message}
                            </Typography>
                          )}
                        </>
                      ) : (
                        <>
                          {post.message.match(regexContainsUrl) ? (
                            <Typography
                              variant="body2"
                              className={classes.root}
                            >
                              <a
                                href={
                                  post.message
                                    .match(regexContainsUrl)[0]
                                    .startsWith('http')
                                    ? post.message.match(regexContainsUrl)[0]
                                    : `//${
                                        post.message.match(regexContainsUrl)[0]
                                      }`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {post.message}
                              </a>
                            </Typography>
                          ) : (
                            <Typography variant="body2" align="left">
                              {post.message}
                            </Typography>
                          )}
                        </>
                      )}
                    </>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      align="left"
                    >{`${post.createdBy.name}, ${moment(
                      post.createdAt
                    ).fromNow()}`}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Divider />

        <Grid container style={{ padding: '20px' }}>
          <Grid item xs={12} align="left">
            {imageAttached && (
              <Chip
                label={fileInput.current.files[0].name}
                onDelete={() => deleteImage()}
                color="primary"
              />
            )}
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="outlined-basic-email"
              placeholder="Type Something"
              fullWidth
              value={messageText}
              onChange={event => setMessageText(event.target.value)}
            />
          </Grid>
          <Grid item xs={1} align="right">
            <IconButton aria-label="upload image">
              <input
                // key={inputKey}
                accept="image/*"
                className={iconClasses.input}
                id="contained-button-file"
                multiple
                type="file"
                ref={fileInput}
                onChange={() => handleImageChange(true)}
              />
              <label htmlFor="contained-button-file">
                <CameraAltIcon />
              </label>
            </IconButton>
          </Grid>
          <Grid item xs={1} align="right">
            <IconButton
              color="secondary"
              onClick={() => handleSubmitComment()}
              disabled={
                messageText.length < 1 && imageAttached === false ? true : false
              }
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid> */}
      <div className={classes.root}>
        <Card className={classes.card}>
          <List id="list" className={classes.messageArea}>
            {posts.map((post, index) => (
              <ListItem
                key={post._id}
                autoFocus={index === posts.length - 1 ? true : false}
                className={
                  post.createdBy._id === loggedInUser
                    ? classes.alignRight
                    : classes.alignLeft
                }
              >
                <Grid
                  item
                  xs={9}
                  md={10}
                  container
                  className={
                    post.createdBy._id === loggedInUser
                      ? isDarkMode
                        ? classes.myMessageBubbleDark
                        : classes.myMessageBubbleLight
                      : isDarkMode
                      ? classes.messageBubbleDark
                      : classes.messageBubbleLight
                  }
                >
                  <Grid item>
                    <>
                      {post.image.imageUrl !== '' ? (
                        <>
                          <img
                            alt="comment"
                            className={classes.postImage}
                            src={post.image.imageUrl}
                          />
                          {post.message.match(regexContainsUrl) ? (
                            <Typography
                              variant="body2"
                              className={classes.root}
                            >
                              <a
                                href={
                                  post.message
                                    .match(regexContainsUrl)[0]
                                    .startsWith('http')
                                    ? post.message.match(regexContainsUrl)[0]
                                    : `//${
                                        post.message.match(regexContainsUrl)[0]
                                      }`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {post.message}
                              </a>
                            </Typography>
                          ) : (
                            <Typography variant="body2" align="left">
                              {post.message}
                            </Typography>
                          )}
                        </>
                      ) : (
                        <>
                          {post.message.match(regexContainsUrl) ? (
                            <Typography
                              variant="body2"
                              className={classes.root}
                            >
                              <a
                                href={
                                  post.message
                                    .match(regexContainsUrl)[0]
                                    .startsWith('http')
                                    ? post.message.match(regexContainsUrl)[0]
                                    : `//${
                                        post.message.match(regexContainsUrl)[0]
                                      }`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {post.message}
                              </a>
                            </Typography>
                          ) : (
                            <Typography variant="body2" align="left">
                              {post.message}
                            </Typography>
                          )}
                        </>
                      )}
                    </>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      align="left"
                    >{`${post.createdBy.name}, ${moment(
                      post.createdAt
                    ).fromNow()}`}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={12} align="left">
              {imageAttached && (
                <Chip
                  label={fileInput.current.files[0].name}
                  onDelete={() => deleteImage()}
                  color="primary"
                />
              )}
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="outlined-basic-email"
                placeholder="Type Something"
                fullWidth
                value={messageText}
                onChange={event => setMessageText(event.target.value)}
              />
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton aria-label="upload image">
                <input
                  // key={inputKey}
                  accept="image/*"
                  className={iconClasses.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  ref={fileInput}
                  onChange={() => handleImageChange(true)}
                />
                <label htmlFor="contained-button-file">
                  <CameraAltIcon />
                </label>
              </IconButton>
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton
                color="secondary"
                onClick={() => handleSubmitComment()}
                disabled={
                  messageText.length < 1 && imageAttached === false
                    ? true
                    : false
                }
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};
export default Comments;
