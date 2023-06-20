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
	editAccount,
	setEditAccount,
}) {
	const [updatedAccount, setUpdatedAccount] = React.useState({
		id: '',
		password: '',
		email: '',
	});
	const handleAccountDelete = () => {};
	const handleEditAccount = () => {
		setEditAccount(true);
	};

	return (
		<Dialog open={openProDia} onClose={handleProClose}>
			<DialogTitle>{editAccount ? 'Edit Account' : 'Profile'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You are currently logged in as: {user.username}
				</DialogContentText>
				{editAccount ? <EditAccountForm /> : ''}
			</DialogContent>
			<DialogActions>
				<Stack direction="row" spacing={2}>
					<Button variant="outlined" onClick={handleEditAccount}>
						Edit Account
					</Button>
					<Button variant="outlined" onClick={handleAccountDelete}>
						Delete Account
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
