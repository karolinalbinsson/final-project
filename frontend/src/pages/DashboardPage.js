import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import Nav from "../lib/Nav";
import ProjectThumb from "../components/ProjectThumb";
import { getUserProjects } from "../reducers/user";

const DashboardPage = () => {
	//const { userId } = useParams();
	const userId = useSelector((store) => store.user.login.userId);
	const projects = useSelector((store) => store.user.project.createdProjects);
	const errorMessage = useSelector((store) => store.user.login.errorMessage);
	console.log("dashboardPage", userId);
	const dispatch = useDispatch();

	useEffect(() => {
		if (userId) {
			dispatch(getUserProjects());
		}
	}, [userId, dispatch]);

	return (
		<>
			<Nav />
			{projects.map((project) => (
				<ProjectThumb
					key={project._id}
					projectId={project._id}
					projectTitle={project.projectName}
					createdAt={moment(project.createdAt).format("dddd, MMMM Do YYYY")}
					description={project.projectDescription}
				/>
			))}
			{errorMessage && <p>{errorMessage}</p>}
			{/* <section>
        {projects.map(project => (
          <p>{project.projectName}</p>
        ))}
        <div>This is your dashboard</div>
      </section> */}
		</>
	);
};
export default DashboardPage;
