import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import SnackBarComponent from "lib/SnackBarComponent";
import { getSingleProject } from "../reducers/user";
import Card from "../lib/Card";
import ProjectEditDialog from "../components/ProjectEditDialog";
import Comments from "../components/Comments";
import Navigation from "../lib/Navigation";
import { useMainStyles } from "../styles/Styles";
import BackdropLoader from "../lib/BackdropLoader";

const ProjectPage = () => {
	const { projectId } = useParams();
	const dispatch = useDispatch();
	const project = useSelector((store) => store.user.project.singleProject);
	const numberOfInvitedUsers = useSelector(
		(store) => store.user.project.invitedUsers
	);
	const isDialogEditOpen = useSelector(
		(store) => store.user.login.isDialogEditOpen
	);

	const classes = useMainStyles();

	useEffect(() => {
		if (numberOfInvitedUsers !== 0) {
			dispatch(getSingleProject(projectId));
		}
	}, [numberOfInvitedUsers, projectId, dispatch]);

	useEffect(() => {
		dispatch(getSingleProject(projectId));
	}, [projectId, dispatch]);

	return (
		<>
			{project && (
				<div className={classes.root}>
					<Navigation pageHeader={project.projectName} />
					<main className={classes.content}>
						<div className={classes.appBarSpacer} />
						<Container maxWidth="lg" className={classes.container}>
							<Grid container spacing={3}>
								<Grid item md={7} xs={12}>
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
										invitedUsersEmail={project.invitedUsersEmail}
									/>
								</Grid>
								<Comments projectId={project._id} posts={project.posts} />
							</Grid>
							<SnackBarComponent />
							<BackdropLoader />
						</Container>
					</main>
				</div>
			)}
			{isDialogEditOpen && <ProjectEditDialog />}
		</>
	);
};
export default ProjectPage;
