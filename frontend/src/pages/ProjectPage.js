import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SnackBarComponent from "lib/SnackBarComponent";
import { useTemplateStyles } from "../styles/Styles";
import { getSingleProject } from "../reducers/user";
import Card from "../lib/Card";
import TemplateListItems from "../components/TemplateListItems";
import ProjectEditDialog from "../components/ProjectEditDialog";
import Comments from "../components/Comments";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
}));

const ProjectPage = () => {
	const [open, setOpen] = useState(false);

	const { projectId } = useParams();
	const dispatch = useDispatch();
	const project = useSelector((store) => store.user.project.singleProject);
	const numberOfInvitedUsers = useSelector(
		(store) => store.user.project.invitedUsers
	);
	const isDialogEditOpen = useSelector(
		(store) => store.user.login.isDialogEditOpen
	);
	console.log("projectpage", isDialogEditOpen);

	const classes = useStyles();

	//kan vi slå ihop dessa två useEffect på något sätt?
	useEffect(() => {
		if (numberOfInvitedUsers !== 0) {
			dispatch(getSingleProject(projectId));
		}
	}, [numberOfInvitedUsers, dispatch]);

	useEffect(() => {
		dispatch(getSingleProject(projectId));
	}, [projectId, dispatch]);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<>
			{project && (
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
								{project && project.projectName}
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
							paper: clsx(
								classes.drawerPaper,
								!open && classes.drawerPaperClose
							),
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
									<Card
										projectId={project._id}
										projectTitle={project.projectName}
										createdAt={moment(project.createdAt).fromNow()}
										shortDescription={project.projectShortDescription}
										longDescription={project.projectLongDescription}
										usersInvited={project.usersInvited}
										creator={project.creator.name}
										updatedAt={moment(project.updatedAt).fromNow()}
										imageUrl={project.image.imageUrl}
									/>

									{/* {isDialogOpen && <ProjectDialog />} */}
								</Grid>

								<Comments projectId={project._id} posts={project.posts} />
							</Grid>
							<SnackBarComponent />
						</Container>
					</main>
				</div>
			)}
			{isDialogEditOpen && (
				<ProjectEditDialog
				// projectId={project._id}
				// projectTitle={project.projectName}
				// shortDescription={project.projectShortDescription}
				// longDescription={project.projectLongDescription}
				/>
			)}
		</>
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
export default ProjectPage;
