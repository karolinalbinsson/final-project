import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { logout, user } from "../reducers/user";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { addComment } from "reducers/user";
import { animateScroll } from "react-scroll";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	chatSection: {
		width: "100%",
		height: "80vh",
	},
	headBG: {
		backgroundColor: "#e0e0e0",
	},
	borderRight500: {
		borderRight: "1px solid #e0e0e0",
	},
	messageArea: {
		height: "70vh",
		//overflowY: "auto",
		overflowY: "scroll",
		overscrollBehaviorY: "contain",
		scrollSnapType: "y proximity",
	},
	messageBubble: {
		background: "yellow",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		padding: "5px",
		wordBreak: "break-word",

		//width: "100%",
	},
	myMessageBubble: {
		background: "pink",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		padding: "5px",
		wordBreak: "break-word",

		//width: "100%",
	},
	alignLeft: {
		justifyContent: "flex-start",
	},
	alignRight: {
		justifyContent: "flex-end",
	},
});

const Comments = ({ projectId, posts }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const singleProjectId = projectId;
	const postsIn = posts;
	const loggedInUser = useSelector((store) => store.user.login.userId);

	const [messageText, setMessageText] = useState("");
	const [messageUpdate, setMessageUpdate] = useState(0);
	//const posts = singleProject.posts;
	const handleSubmitComment = () => {
		console.log("handlesubmitcomment");
		dispatch(addComment(singleProjectId, messageText, loggedInUser));
		setMessageText("");
		setMessageUpdate(messageUpdate + 1);
	};

	useEffect(() => {
		scrollToBottom();
	}, [posts]);

	const scrollToBottom = () => {
		animateScroll.scrollToBottom({
			containerId: "list",
		});
	};

	return (
		<Grid item md={4} xs={12}>
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
								container
								className={
									post.createdBy._id === loggedInUser
										? classes.myMessageBubble
										: classes.messageBubble
								}
							>
								<Grid item>
									<ListItemText
										align="left"
										primary={post.message}
									></ListItemText>
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

			<Grid container style={{ padding: "20px" }}>
				<Grid item xs={11}>
					<TextField
						id="outlined-basic-email"
						label="Type Something"
						fullWidth
						value={messageText}
						onChange={(event) => setMessageText(event.target.value)}
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
			</Grid>
		</Grid>
	);
};
export default Comments;
