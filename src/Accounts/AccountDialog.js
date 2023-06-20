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
	user,
	setUser,
	setOpenDia,
	logIn,
	openDia,
	handleClose,
	needAccount,
	setNeedAccount,
	allUsers,
}) {
	const [goodAccount, setGoodAccount] = React.useState(false);
	const [newAccount, setNewAccount] = React.useState({
		username: '',
		password: '',
		email: '',
	});
	const [createDisable, setCreateDisable] = React.useState(true);
	const handleLogIn = async () => {
		console.log(user);
		setOpenDia(false);
		logIn(user);
	};
	const handleCreate = async () => {
		if (goodAccount) {
			setOpenDia(false);
			try {
				const res = await axios.post(
					'http://localhost:3300/accounts/new',
					newAccount
				);
				setUser({ username: newAccount.username, id: res.data });
				logIn(user);
			} catch (e) {
				console.log(e);
			}
		}
	};
	return (
		<Dialog open={openDia} onClose={handleClose}>
			<DialogTitle>
				{needAccount ? 'Create Account' : 'Existing Account'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{needAccount
						? 'Create a new account. If you already have an account click the log in button to log in with your username and password'
						: 'Sign in with your username and password or create a new account by clicking the register button'}
				</DialogContentText>
				{needAccount ? (
					<CreateAccountForm
						setNewAccount={setNewAccount}
						allUsers={allUsers}
						setGoodAccount={setGoodAccount}
						setCreateDisable={setCreateDisable}
					/>
				) : (
					<LogInForm setUser={setUser} />
				)}
			</DialogContent>
			<DialogActions>
				{needAccount ? (
					<Stack direction="row" spacing={2}>
						<Button variant="outlined" onClick={() => setNeedAccount(false)}>
							logIn
						</Button>
						<Button
							variant="outlined"
							disabled={createDisable}
							onClick={handleCreate}>
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
