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

export default function ProfileDialog({
	openProDia,
	handleProClose,
	user,
	setUser,
	editAccount,
	setEditAccount,
	allUsers,
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
		try {
			await axios.delete(`http://localhost:3300/accounts/${user.id}`);
			handleProClose();
			logOut();
		} catch (e) {
			console.log(e); // TODO: change for post
		}
	};
	const handleEditAccount = async () => {
		if (goodAccount) {
			setUpdateDisable(true);
			setEditAccount(false);
			setUser({
				username: user.username,
				id: user.id,
				email: updatedAccount.email,
			});
			try {
				await axios.put(
					`http://localhost:3300/accounts/${user.id}`,
					updatedAccount
				);
			} catch (e) {
				console.log(e); // TODO: change for post
			}
		} else {
			console.log('error');
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
						allUsers={allUsers}
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
