import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import axios from 'axios';
import { encryptData } from '../CodeHelper';

import LogInForm from './LogInForm';
import CreateAccountForm from './CreateAccountForm';

export default function AccountDialog({
	setUser,
	setOpenDia,
	logIn,
	openDia,
	handleClose,
	needAccount,
	setNeedAccount,
}) {
	const [goodAccount, setGoodAccount] = React.useState(false);
	const [newAccount, setNewAccount] = React.useState({
		username: '',
		password: '',
		email: '',
	});
	const [account, setAccount] = React.useState({
		username: '',
		password: '',
	});
	const [createDisable, setCreateDisable] = React.useState(true);
	const [badUser, setBadUser] = React.useState(false);

	const handleLogIn = async () => {
		try {
			const res = await axios.post('http://localhost:3300/login', account);
			if (res.data === false)
				setBadUser(true); //trigger error for username/password
			else {
				setUser(res.data);
				// set cookie for user and set expiration to 7 days from now
				let expires = new Date(Date.now() + 86400 * 7000).toUTCString();
				document.cookie = `rbuid = ${await encryptData(
					res.data
				)}; expires = ${expires}; secure`;
				setOpenDia(false);
				logIn();
			}
		} catch (e) {
			console.log(e); // TODO: change for post
		}
	};
	const handleCreate = async () => {
		if (goodAccount) {
			handleClose();
			try {
				const res = await axios.post(
					'http://localhost:3300/accounts/new',
					newAccount
				);
				setUser({
					username: newAccount.username,
					id: res.data,
					email: newAccount.email,
				});
				logIn();
			} catch (e) {
				console.log(e); // TODO: change in post
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
						setGoodAccount={setGoodAccount}
						setCreateDisable={setCreateDisable}
					/>
				) : (
					<LogInForm setAccount={setAccount} badUser={badUser} />
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
