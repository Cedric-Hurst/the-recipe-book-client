import * as React from 'react';

import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';

import NavList from './NavList';
import AccountDialog from '../Accounts/AccountDialog';
import ProfileDialog from '../Accounts/ProfileDialog';
import SearchDialog from '../Helpers/SearchDialog';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));
const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '300px',
	[theme.breakpoints.down('md')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));
const LogButton = styled(Button)(({ theme }) => ({
	color: theme.palette.common.white,
	borderColor: theme.palette.common.white,
	fontWeight: 400,
	'&:hover': {
		borderColor: theme.palette.common.white,
		backgroundColor: 'rgba(255,255,255,0.3)',
	},
	[theme.breakpoints.down('md')]: {
		fontSize: '10px',
		height: '30px',
	},
}));

export default function Navbar({ isLoggedIn, logOut, logIn, user, setUser }) {
	const theme = useTheme();

	const [open, setOpen] = React.useState(false); //drawer
	const [openDia, setOpenDia] = React.useState(false); // login dialog
	const [openProDia, setOpenProDia] = React.useState(false); //profile dialog
	const [openSearchDia, setOpenSearchDia] = React.useState(false); //Search Dialog

	const [needAccount, setNeedAccount] = React.useState(false);
	const [editAccount, setEditAccount] = React.useState(false);

	const [anchorEl, setAnchorEl] = React.useState(null); //profile menu
	const openMenu = Boolean(anchorEl);

	const navigate = useNavigate();

	//profile menu
	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	//sign in / create account dialog
	const handleClickOpen = () => {
		setOpenDia(true);
	};
	const handleClose = () => {
		setOpenDia(false);
		setNeedAccount(false);
	};
	//profile / edit dialog
	const handleProClickOpen = () => {
		handleMenuClose();
		setOpenProDia(true);
	};
	const handleProClose = () => {
		setOpenProDia(false);
		setEditAccount(false);
	};
	//searchbar
	const handleSearchOpen = () => {
		document.activeElement.blur(); //blur the searchbar so clickaway closes dialog
		setOpenSearchDia(true);
	};
	const handleSearchClose = () => {
		setOpenSearchDia(false);
	};

	//app Drawer
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleClickAway = () => {
		setOpen(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					open={open}
					sx={{ backgroundColor: 'green' }}
					className="navbar">
					<Toolbar sx={{ justifyContent: 'space-between' }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								mr: 2,
								...(open && { display: 'none' }),
							}}>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h1"
							noWrap
							component="div"
							onClick={() => navigate('/')}
							sx={{
								marginRight: 'auto',
								fontSize: { xs: '20px' },
								cursor: 'pointer',
							}}>
							RecipeBook
						</Typography>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								id="searchbar"
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
								onFocusCapture={handleSearchOpen}
							/>
						</Search>
						{isLoggedIn ? (
							<div>
								<IconButton
									onClick={handleMenuClick}
									sx={{ marginLeft: '5px' }}>
									<AccountCircleIcon sx={{ color: 'white' }} />
								</IconButton>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={openMenu}
									onClose={handleMenuClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}>
									<MenuItem onClick={handleProClickOpen}>Profile</MenuItem>
									<MenuItem
										onClick={() => {
											handleMenuClose();
											logOut();
										}}>
										Logout
									</MenuItem>
								</Menu>
							</div>
						) : (
							<LogButton
								variant="outlined"
								sx={{ marginLeft: 5 }}
								onClick={handleClickOpen}>
								LogIn
							</LogButton>
						)}
					</Toolbar>
				</AppBar>
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					variant="persistent"
					anchor="left"
					open={open}>
					<DrawerHeader>
						<span style={{ marginRight: 'auto', marginLeft: '10px' }}>
							TheRecipeBook
						</span>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'ltr' ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<NavList user={user} handleDrawerClose={handleDrawerClose} />
				</Drawer>
				<AccountDialog
					user={user}
					setUser={setUser}
					setOpenDia={setOpenDia}
					logIn={logIn}
					openDia={openDia}
					handleClose={handleClose}
					needAccount={needAccount}
					setNeedAccount={setNeedAccount}
				/>
				<ProfileDialog
					openProDia={openProDia}
					handleProClose={handleProClose}
					user={user}
					editAccount={editAccount}
					setEditAccount={setEditAccount}
					logOut={logOut}
					setUser={setUser}
				/>
				<SearchDialog
					openSearchDia={openSearchDia}
					handleSearchClose={handleSearchClose}
				/>
			</Box>
		</ClickAwayListener>
	);
}
