import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import axios from 'axios';

import EditAccountForm from './EditAccountForm';
import ErrorPage from '../ErrorPage';

export default function ProfileDialog({
	openProDia,
	handleProClose,
	user,
	setUser,
	editAccount,
	setEditAccount,
	logOut,
}) {
	const [goodAccount, setGoodAccount] = React.useState(false);
	const [updatedAccount, setUpdatedAccount] = React.useState({
		id: user.id,
		password: '',
		email: '',
	});
	const [updateDisable, setUpdateDisable] = React.useState(true);

	const handleAccountDelete = async () => {
		handleProClose();
		logOut();
		try {
			await axios.delete(`http://localhost:3300/accounts/${user.id}`);
		} catch (e) {
			return <ErrorPage errorCode={e} />;
		}
	};
	const handleEditAccount = async () => {
		if (goodAccount) {
			let updatedUser = { email: '', password: '' };
			if (updatedAccount.email === '' && updatedAccount.password !== '')
				updatedUser = { email: user.email, password: updatedAccount.password };
			else if (updatedAccount.email !== '' && updatedAccount.password === '')
				updatedUser = { email: updatedAccount.email, password: user.password };
			else updatedUser = updatedAccount;
			setUpdateDisable(true);
			setEditAccount(false);
			setUser({
				username: user.username,
				id: user.id,
				email: updatedUser.email,
			});

			try {
				await axios.put(
					`http://localhost:3300/accounts/${user.id}`,
					updatedUser
				);
			} catch (e) {
				return <ErrorPage errorCode={e} />;
			}
		} else {
			return <ErrorPage errorCode={'Profile Error'} />;
		}
	};

	return (
		<Dialog open={openProDia} onClose={handleProClose}>
			<DialogTitle>{editAccount ? 'Edit Account' : 'Profile'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<span style={{ display: 'block' }}>Username: {user.username}</span>
					<span style={{ display: 'block' }}>Email: {user.email}</span>
				</DialogContentText>
				{editAccount ? (
					<EditAccountForm
						setUpdatedAccount={setUpdatedAccount}
						setGoodAccount={setGoodAccount}
						setUpdateDisable={setUpdateDisable}
					/>
				) : (
					''
				)}
			</DialogContent>
			<DialogActions>
				{editAccount ? (
					<Stack direction="row" spacing={2}>
						<Button
							variant="outlined"
							disabled={updateDisable}
							onClick={handleEditAccount}>
							Update
						</Button>
						<Button variant="outlined" onClick={() => setEditAccount(false)}>
							Back
						</Button>
					</Stack>
				) : (
					<Stack direction="row" spacing={2}>
						<Button variant="outlined" onClick={() => setEditAccount(true)}>
							Edit Account
						</Button>
						<Button variant="outlined" onClick={handleAccountDelete}>
							Delete Account
						</Button>
					</Stack>
				)}
			</DialogActions>
		</Dialog>
	);
}
