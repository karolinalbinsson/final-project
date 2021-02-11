import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: "#fff",
	},
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const BackdropLoader = () => {
	const classes = useStyles();
	const isLoading = useSelector((store) => store.ui.isLoading);

	console.log("Backdrop loader loading:", isLoading);
	return (
		<Backdrop
			transitionDuration={2000}
			className={classes.backdrop}
			open={isLoading}
		>
			{/* <CircularProgress color="inherit" /> */}

			<div className={classes.root}>
				<LinearProgress color="secondary" />
			</div>
		</Backdrop>
	);
};
export default BackdropLoader;