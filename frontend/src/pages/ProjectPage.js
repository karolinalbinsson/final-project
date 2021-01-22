import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getSingleProject } from "../reducers/user";
import ProjectLarge from "../components/ProjectLarge";

const ProjectPage = () => {
	const { projectId } = useParams();
	const dispatch = useDispatch();
	const project = useSelector((store) => store.user.project.singleProject);
	console.log(project);

	useEffect(() => {
		dispatch(getSingleProject(projectId));
	}, [projectId, dispatch]);

	return (
		<>
			<p>This is single project </p>
			{project && (
				<ProjectLarge
					projectId={project._id}
					projectTitle={project.projectName}
					createdAt={moment(project.createdAt).format("dddd, MMMM Do YYYY")}
					description={project.projectShortDescription}
					longDescription={project.projectLongDescription}
				/>
			)}
		</>
	);
};
export default ProjectPage;
