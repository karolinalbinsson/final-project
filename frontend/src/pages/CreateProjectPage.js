import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CreateProject from "../components/CreateProject";

//import { getSingleProject } from "../reducers/user";

const CreateProjectPage = () => {
	//const creatorUserId = useSelector((store) => store.user.login.userid);

	return <CreateProject />;
};
export default CreateProjectPage;
