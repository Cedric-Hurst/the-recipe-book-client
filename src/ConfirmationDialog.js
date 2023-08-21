import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function ConfirmationDialog({
	open,
	handleClose,
	doFunction,
	confirmText,
}) {
	const handleConfirm = () => {
		doFunction();
		handleClose();
	};
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="confirm-dialog-title"
				aria-describedby="confirm-dialog-description">
				<DialogTitle id="confirm-dialog-title">
					{`Are you sure you want to ${confirmText}`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="confirm-dialog-description">
						There is no going back once you do this!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleConfirm}>Confirm</Button>
					<Button onClick={handleClose} autoFocus>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
