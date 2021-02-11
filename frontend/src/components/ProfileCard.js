import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { changePassword } from "reducers/user";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteUser, addProfileImage } from "reducers/user";
import AlertDialog from "../lib/AlertDialog";
import AvatarImage from "../lib/AvatarImage";
import { useCardStyles, useProfileStyles, SmallAvatar } from "../styles/Styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const ProfileCard = ({
	name,
	lastName,
	email,
	createdAt,
	allProjects,
	myProjects,
	userId,
	initials,
}) => {
	const [anchorEl, setAnchorEl] = useState(null); //edit button högst upp
	const [openAlert, setOpenAlert] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const dispatch = useDispatch();
	const classes = useCardStyles();
	const profileClasses = useProfileStyles();
	const fileInput = useRef();
	const profileImage = useSelector((store) => store.user.login.profileImage);
	console.log("PROFILE IMAGE,", { profileImage });
	const handleChangeNewPassword = (text) => {
		setNewPassword(text);
		setPasswordMatch(true);
	};

	const handleChangeRepeatPassword = (text) => {
		setRepeatPassword(text);
		setPasswordMatch(true);
	};
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePasswordDialogClose = () => {
		setAnchorEl(null);
		setNewPassword("");
		setRepeatPassword("");
		setCurrentPassword("");
	};

	const toggleAlert = () => {
		setOpenAlert(!openAlert);
		handleClose();
	};

	const handleDelete = () => {
		dispatch(deleteUser(userId));
	};

	const testSubmit = () => {
		dispatch(addProfileImage(fileInput));
	};

	const togglePasswordDialog = () => {
		setOpenPasswordDialog(!openPasswordDialog);
		handlePasswordDialogClose();
	};

	const submitChangePassword = () => {
		if (newPassword === repeatPassword) {
			setPasswordMatch(true);
			dispatch(changePassword(currentPassword, newPassword));
			togglePasswordDialog();
		} else setPasswordMatch(false);
	};

	return (
		<>
			<div className={classes.root}>
				{openAlert && (
					<AlertDialog
						open={openAlert}
						handleClose={toggleAlert}
						handleDelete={handleDelete}
						name={name}
						deleteTitle="Delete account"
					/>
				)}
				<Dialog
					open={openPasswordDialog}
					onClose={() => togglePasswordDialog}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Change password</DialogTitle>
					<DialogContent>
						<FormControl
							className={profileClasses.form}
							fullWidth
							variant="outlined"
						>
							<InputLabel htmlFor="password1">Current Password</InputLabel>
							<Input
								placeholder="Current password"
								required={true}
								id="password1"
								type={showOldPassword ? "text" : "password"}
								value={currentPassword}
								fullWidth={true}
								onChange={(event) => setCurrentPassword(event.target.value)}
								//inputProps={minimumPasswordLength}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowOldPassword(!showOldPassword)}
										>
											{showOldPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelwidth={70}
							/>{" "}
						</FormControl>
						<FormControl
							className={profileClasses.form}
							fullWidth
							variant="outlined"
						>
							<InputLabel htmlFor="password2">New password</InputLabel>
							<Input
								error={passwordMatch === true ? false : true}
								placeholder="New password"
								required={true}
								id="password2"
								type={showNewPassword ? "text" : "password"}
								value={newPassword}
								fullWidth={true}
								onChange={(event) =>
									handleChangeNewPassword(event.target.value)
								}
								//inputProps={minimumPasswordLength}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowNewPassword(!showNewPassword)}
										>
											{showNewPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								labelwidth={70}
							/>
						</FormControl>
						<FormControl
							className={profileClasses.form}
							fullWidth
							variant="outlined"
						>
							<InputLabel htmlFor="password3">Repeat new password</InputLabel>
							<Input
								error={passwordMatch ? false : true}
								placeholder="Repeat new password"
								id="password3"
								type={showRepeatPassword ? "text" : "password"}
								value={repeatPassword}
								onChange={(event) =>
									handleChangeRepeatPassword(event.target.value)
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShowRepeatPassword(!showRepeatPassword)}
										>
											{showRepeatPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>{" "}
							{passwordMatch === false && (
								<Typography
									color="error"
									align="right"
									variant="caption"
									display="block"
									gutterBottom
								>
									Passwords must match
								</Typography>
							)}
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button onClick={togglePasswordDialog} variant="outlined">
							Cancel
						</Button>
						<Button
							disabled={newPassword.length < 5 || repeatPassword.length < 5}
							onClick={() => submitChangePassword()}
							variant="contained"
							color="primary"
						>
							Submit
						</Button>
					</DialogActions>
				</Dialog>
				<Grid container spacing={3}>
					<Grid item xs={12} md={9} className={classes.card}>
						<Card>
							<CardHeader
								align="center"
								action={
									<>
										<IconButton aria-label="settings" onClick={handleClick}>
											<MoreVertIcon />
										</IconButton>

										<Menu
											id="simple-menu"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleClose}
										>
											<MenuItem onClick={togglePasswordDialog}>
												Change password
											</MenuItem>
											<MenuItem onClick={toggleAlert}>Delete account</MenuItem>
										</Menu>
									</>
								}
								title={`${name} ${lastName}`}
							/>

							<div className={profileClasses.avatarImage}>
								<Badge
									overlap="circle"
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									badgeContent={
										<>
											<IconButton aria-label="change profile image">
												<input
													accept="image/*"
													className={profileClasses.input}
													id="contained-button-file"
													multiple
													type="file"
													ref={fileInput}
													onChange={(event) => testSubmit()}
												/>
												<label htmlFor="contained-button-file">
													<SmallAvatar>
														<CameraAltIcon />
													</SmallAvatar>
												</label>
											</IconButton>
										</>
									}
								>
									<AvatarImage
										initials={initials}
										className={profileClasses.large}
										alt={"profile image"}
										src={profileImage}
									/>
								</Badge>
							</div>

							<CardContent>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									align="center"
								>
									{email}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									align="center"
								>
									Member since {moment(createdAt).format("MMMM Do YYYY")}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									align="center"
								>
									Collaborating in {allProjects.length} projects
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
									align="center"
								>
									Created {myProjects.length} projects
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</div>
		</>
	);
};
export default ProfileCard;
