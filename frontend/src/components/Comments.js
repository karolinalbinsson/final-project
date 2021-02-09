import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';

import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';

import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { addComment } from 'reducers/user';
import { animateScroll } from 'react-scroll';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { DropzoneArea } from 'material-ui-dropzone';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { useDebounce } from 'use-debounce';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    //overflowY: "auto",
    overflowY: 'scroll',
    overscrollBehaviorY: 'contain',
    scrollSnapType: 'y proximity',
  },
  messageBubble: {
    background: '#fff0f5',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    wordBreak: 'break-word',

    //width: "100%",
  },
  myMessageBubble: {
    background: '#ebedf8',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    wordBreak: 'break-word',

    //width: "100%",
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  reverseFlexOrder: {
    flexDirection: 'row-reverse',
  },
  customAccordion: {
    backgroundColor: 'transparent',
    boxShadow: 'unset',
    '&::before': {
      background: 'transparent',
    },
  },
  postImage: {
    maxHeight: '300px',
    maxWidth: '100%',
  },
  dropZone: {
    minHeight: 'unset',
    maxHeight: '200px',
  },
});

const Comments = ({ projectId, posts }) => {
  //If we write a sentence that contains an url, is there any way to extract only the url??
  const dispatch = useDispatch();
  const classes = useStyles();

  const singleProjectId = projectId;
  const postsIn = posts;
  const loggedInUser = useSelector(store => store.user.login.userId);

  const [messageText, setMessageText] = useState('');
  const [messageUpdate, setMessageUpdate] = useState(0);
  const [dropzoneOpen, setDropzoneOpen] = useState(false);
  const regexIsUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  const regexContainsUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim;
  const isUrl = new RegExp(regexIsUrl);
  const containsUrl = new RegExp(regexContainsUrl);
  console.log('test regex:', containsUrl.test('kolla denna www.google.com'));

  const [key, setKey] = useState(0);
  const [debounceKey] = useDebounce(key, 1000);

  console.log('posts: ', postsIn);
  //const posts = singleProject.posts;
  const handleSubmitComment = () => {
    console.log('handlesubmitcomment');
    //dispatch(addComment(singleProjectId, messageText, loggedInUser,file));
    dispatch(addComment(singleProjectId, messageText, loggedInUser, file));
    setDropzoneOpen(false);
    setKey(key + 1);
    setMessageText('');
    setFile('');
    setMessageUpdate(messageUpdate + 1);
  };

  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  const toggleDropZone = () => {
    setDropzoneOpen(!dropzoneOpen);
  };

  const onLinkClick = (event, url) => {
    event.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const [file, setFile] = useState([]);
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'list',
    });
  };

  return (
    <Grid item md={5} xs={12}>
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
                    ? classes.myMessageBubble
                    : classes.messageBubble
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
                          <Typography className={classes.root}>
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
                          <ListItemText
                            align="left"
                            primary={post.message}
                          ></ListItemText>
                        )}
                      </>
                    ) : (
                      <>
                        {post.message.match(regexContainsUrl) ? (
                          <Typography className={classes.root}>
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
                          <ListItemText
                            align="left"
                            primary={post.message}
                          ></ListItemText>
                        )}
                      </>
                    )}
                  </>
                </Grid>
                <Grid item>
                  <ListItemText
                    align="left"
                    secondary={`${post.createdBy.name}, ${moment(
                      post.createdAt
                    ).fromNow()}`}
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Divider />

      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            fullWidth
            value={messageText}
            onChange={event => setMessageText(event.target.value)}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => handleSubmitComment()}
            disabled={messageText.length < 1 ? true : false}
          >
            <SendIcon />
          </Fab>
        </Grid>
        <Accordion
          onChange={() => toggleDropZone()}
          expanded={dropzoneOpen}
          className={classes.customAccordion}
        >
          <AccordionSummary
            className={classes.reverseFlexOrder}
            expandIcon={<CameraAltIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            align="left"
          ></AccordionSummary>
          <AccordionDetails>
            <DropzoneArea
              dropzoneClass={classes.dropZone}
              key={debounceKey}
              clearOnUnmount={true}
              filesLimit={1}
              initialFiles={[]}
              onChange={files => setFile(files)}
              useChipsForPreview={true}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
export default Comments;
