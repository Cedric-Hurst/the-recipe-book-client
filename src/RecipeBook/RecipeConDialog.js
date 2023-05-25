import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import {
	tsp,
	tbsp,
	fl,
	c,
	pt,
	qt,
	gal,
	ml,
	l,
	kg,
	g,
	mg,
	oz,
	lb,
} from '../Conversions';
import { measurements } from '../RecipeData';

const DiaButton = styled(Button)(({ theme }) => ({
	color: 'rgb(0,128,0)',
	borderColor: 'rgb(0,128,0)',
	fontWeight: 400,
	'&:hover': {
		borderColor: 'rgb(0,128,0)',
		backgroundColor: 'rgba(0,128,0,0.3)',
	},
}));
export default function RecipeConDialog() {
	const [value, setValue] = React.useState(0);
	const [measureValue, setMeasureValue] = React.useState(measurements[0]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const getSubText = () => {
		if (!value.isNaN) {
			return (
				<div className="RCD_SubText">
					<DialogContentText>
						{measureValue === 'tsp' && tsp(value)}
						{measureValue === 'tbsp' && tbsp(value)}
						{measureValue === 'fl oz' && fl(value)}
						{measureValue === 'c' && c(value)}
						{measureValue === 'pt' && pt(value)}
						{measureValue === 'qt' && qt(value)}
						{measureValue === 'gal' && gal(value)}
						{measureValue === 'ml' && ml(value)}
						{measureValue === 'l' && l(value)}
						{measureValue === 'kg' && kg(value)}
						{measureValue === 'g' && g(value)}
						{measureValue === 'mg' && mg(value)}
						{measureValue === 'oz' && oz(value)}
						{measureValue === 'lb' && lb(value)}
					</DialogContentText>
				</div>
			);
		}
	};
	const handleEnterPress = (event) => {
		event.key === 'Enter' && event.preventDefault();
	};

	return (
		<>
			<DiaButton variant="outlined" onClick={handleClickOpen}>
				Conversions
			</DiaButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Conversions</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Select the measurement and the amount to convert
					</DialogContentText>
					<Stack direction="row" sx={{ marginTop: 3, marginBottom: 3 }}>
						<TextField
							id="amount-text"
							name="amount"
							label="Amount"
							variant="standard"
							value={value}
							sx={{ width: '75px' }}
							onKeyDown={handleEnterPress}
							onChange={(event) => {
								!isNaN(event.target.value) && setValue(event.target.value);
							}}
						/>
						<FormControl variant="standard" sx={{ minWidth: 120 }}>
							<InputLabel id="measure-label">Measurement</InputLabel>
							<Select
								labelId="measure-label"
								id="measure"
								name="measure"
								defaultValue=""
								onKeyDown={handleEnterPress}
								onChange={(event) => {
									setMeasureValue(event.target.value);
								}}
								label="Measurement">
								{measurements.map((measure, i) => (
									<MenuItem key={i} value={measure.value}>
										{measure.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
					{measureValue !== null && getSubText()}
				</DialogContent>
			</Dialog>
		</>
	);
}
