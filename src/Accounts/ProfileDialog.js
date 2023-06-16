import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import axios from 'axios';

export default function ProfileDialog({ openProDia, handleProClose, account }) {
	const handleAccountDelete = () => {};
	const handleEditAccount = () => {};

	return (
		<Dialog open={openProDia} onClose={handleProClose}>
			{/* dialog for Profile */}
			<DialogTitle>Profile</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You are currently logged in as: {account.username}
				</DialogContentText>
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
