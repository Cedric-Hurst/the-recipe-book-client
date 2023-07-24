import * as React from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import LogInForm from './Accounts/LogInForm';
import CreateAccountForm from './Accounts/CreateAccountForm';

import './SignInFrontPage.css';

export default function SignInFrontPage({ logIn, setUser }) {
	const [needAccount, setNeedAccount] = React.useState(false);
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
				document.cookie = `user = ${JSON.stringify(
					res.data
				)}; expires = ${expires}`;
				logIn();
			}
		} catch (e) {
			console.log(e); // TODO: change for post
		}
	};
	const handleCreate = async () => {
		if (goodAccount) {
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
		<div className="SIFP-background">
			<Paper elevation={18} className="SIFP-Paper">
				<h1>{needAccount ? 'Create Account' : 'Log In'}</h1>
				<div className="SIFP-form">
					{needAccount ? (
						<CreateAccountForm
							setNewAccount={setNewAccount}
							setGoodAccount={setGoodAccount}
							setCreateDisable={setCreateDisable}
						/>
					) : (
						<LogInForm setAccount={setAccount} badUser={badUser} />
					)}
				</div>
				<div className="SIFP-Btns">
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
				</div>
			</Paper>
		</div>
	);
}
