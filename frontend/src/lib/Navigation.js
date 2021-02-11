import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";

import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import NavigationItems from "../components/NavigationItems";
import { useNavigationStyles } from "../styles/Styles";
import { user } from "../reducers/user";

const Navigation = (props) => {
	const { window, pageHeader } = props;
	const classes = useNavigationStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const name = useSelector((store) => store.user.login.name);

	const [mobileOpen, setMobileOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const isDarkMode = useSelector((store) => store.user.login.isDarkMode);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
		setOpen(!open);
	};

	const handleThemeSwitch = () => {
		dispatch(user.actions.toggleDarkMode());
	};

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar className={classes.toolbarTest}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap className={classes.title}>
						{`${name}´s ${pageHeader}`}
					</Typography>
					<Tooltip
						title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
					>
						{/* <ThemeSwitch
							className={classes.switch}
							checked={isDarkMode}
							onChange={handleThemeSwitch}
							name="checkedA"
						/> */}
						<Switch
							checked={isDarkMode}
							onChange={handleThemeSwitch}
							color="default"
							inputProps={{ "aria-label": "checkbox with default color" }}
						/>
					</Tooltip>
					{/* <Switch
						color="secondary"
						checked={isDarkMode}
						onChange={handleThemeSwitch}
						name="checkedA"
						inputProps={{ "aria-label": "primary checkbox" }}
					/> */}
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden smUp>
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						<Divider />
						<List>
							<NavigationItems />
						</List>
					</Drawer>
				</Hidden>
			</nav>

			<Hidden xsDown>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handleDrawerToggle}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</div>
					<Divider />
					<List>
						<NavigationItems />
					</List>
				</Drawer>
			</Hidden>
		</div>
	);
};
export default Navigation;
