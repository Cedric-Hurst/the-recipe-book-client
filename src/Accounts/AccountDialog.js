import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import axios from 'axios';

import LogInForm from './LogInForm';
import CreateAccountForm from './CreateAccountForm';
export default function AccountDialog({
	account,
	setAccount,
	setOpenDia,
	logIn,
	newAccount,
	openDia,
	handleClose,
	needAccount,
	setNeedAccount,
	setNewAccount,
	allUsers,
}) {
	const [goodAccount, setGoodAccount] = React.useState(false);

	const handleLogIn = async () => {
		console.log(account);
		setOpenDia(false);
		logIn();
	};
	const handleCreate = async () => {
		if (goodAccount) {
			try {
				await axios.post('http://localhost:3300/accounts/new', newAccount);
				setOpenDia(false);
				logIn();
			} catch (e) {
				console.log(e);
			}
		}
	};
	return (
		<Dialog open={openDia} onClose={handleClose}>
			{/* dialog for login and create account */}
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
						allUsers={allUsers}
						setGoodAccount={setGoodAccount}
					/>
				) : (
					<LogInForm setAccount={setAccount} />
				)}
			</DialogContent>
			<DialogActions>
				{needAccount ? (
					<Stack direction="row" spacing={2}>
						<Button variant="outlined" onClick={() => setNeedAccount(false)}>
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
	);
}
