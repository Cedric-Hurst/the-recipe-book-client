import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

import { substitutions } from '../RecipeData';
import './RecipeSubsDialog.css';

const DiaButton = styled(Button)(({ theme }) => ({
	color: 'rgb(0,128,0)',
	borderColor: 'rgb(0,128,0)',
	fontWeight: 400,
	'&:hover': {
		borderColor: 'rgb(0,128,0)',
		backgroundColor: 'rgba(0,128,0,0.3)',
	},
}));

export default function RecipeSubsDialog() {
	const [value, setValue] = React.useState(substitutions[0]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const getSubText = () => {
		if (value !== null) {
			return (
				<div className="RSD_SubText">
					<DialogContentText>
						<span>Amount: </span>
						{value.qty}
					</DialogContentText>
					<DialogContentText>
						<span>Substitution: </span>
						{value.sub}
					</DialogContentText>
				</div>
			);
		}
	};

	return (
		<>
			<DiaButton variant="outlined" onClick={handleClickOpen}>
				Substitutions
			</DiaButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Substitutions</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please type in the item you want to find a substitution for.
					</DialogContentText>
					<Autocomplete
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
						id="substitutions"
						options={substitutions}
						sx={{ width: 300, marginTop: 3, marginBottom: 3 }}
						renderInput={(params) => (
							<TextField {...params} label="Substitution" />
						)}
					/>
					{value !== null && getSubText()}
				</DialogContent>
			</Dialog>
		</>
	);
}
