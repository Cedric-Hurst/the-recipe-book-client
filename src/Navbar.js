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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import axios from 'axios';

import NavList from './NavList';
import LogInForm from './LogInForm';
import CreateAccountForm from './CreateAccountForm';

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

export default function Navbar({ isLoggedIn, logOut, logIn, allUsers }) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [openDia, setOpenDia] = React.useState(false);
	const [needAccount, setNeedAccount] = React.useState(false);
	const [newAccount, setNewAccount] = React.useState({
		username: '',
		password: '',
		email: '',
	});
	const [account, setAccount] = React.useState({ username: '', password: '' });
	const [errMessage, setErrMessage] = React.useState('');

	const handleClickOpen = () => {
		setOpenDia(true);
	};
	const handleClose = () => {
		setOpenDia(false);
		setNeedAccount(false);
	};
	const handleLogOut = () => {
		logOut();
	};
	const handleLogIn = async () => {
		console.log(account);
		setOpenDia(false);
		logIn();
	};
	const handleCreate = async () => {
		try {
			const res = await axios.post(
				'http://localhost:3300/accounts/new',
				newAccount
			);
			setErrMessage(res.data);
		} catch (e) {
			console.log(e);
		}
	};
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
							sx={{
								marginRight: 'auto',
								fontSize: { xs: '20px' },
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
							/>
						</Search>
						{isLoggedIn ? (
							<LogButton
								variant="outlined"
								sx={{ marginLeft: 5 }}
								onClick={handleLogOut}>
								LogOut
							</LogButton>
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
							MyRecipes
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
					<NavList
						pageName="RecipeBook"
						handleDrawerClose={handleDrawerClose}
					/>
				</Drawer>
				<Dialog open={openDia} onClose={handleClose}>
					<DialogTitle>
						{needAccount ? 'Create Account' : 'Existing Account'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{needAccount
								? 'Sign in with your username and password or create a new account by clicking the register button'
								: 'Create a new account. If you already have an account click the log in button to log in with your username and password'}
						</DialogContentText>
						{needAccount ? (
							<CreateAccountForm
								setNewAccount={setNewAccount}
								errMessage={errMessage}
								allUsers={allUsers}
							/>
						) : (
							<LogInForm setAccount={setAccount} errMessage={errMessage} />
						)}
					</DialogContent>
					<DialogActions>
						{needAccount ? (
							<Stack direction="row" spacing={2}>
								<Button
									variant="outlined"
									onClick={() => setNeedAccount(false)}>
									logIn
								</Button>
								<Button variant="outlined" onClick={handleCreate}>
									Create Account
								</Button>
							</Stack>
						) : (
							<Stack direction="row" spacing={2}>
								<Button variant="outlined" onClick={handleLogIn}>
									LogIn
								</Button>
								<Button variant="outlined" onClick={() => setNeedAccount(true)}>
									Register
								</Button>
							</Stack>
						)}
					</DialogActions>
				</Dialog>
			</Box>
		</ClickAwayListener>
	);
}
