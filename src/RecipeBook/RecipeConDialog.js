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
} from '../Helpers/Conversions';
import { measurements, fractions } from '../Helpers/RecipeData';

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
	const [wholeNum, setWholeNum] = React.useState(0);
	const [fraction, setFraction] = React.useState(fractions[0]);
	const [measureValue, setMeasureValue] = React.useState(measurements[0]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const getSubText = () => {
		if (!wholeNum.isNaN) {
			const sumNum =
				(wholeNum === '' ? 0 : parseInt(wholeNum)) +
				(fraction === '' ? 0 : parseFloat(fraction));
			return (
				<div>
					<DialogContentText>
						{measureValue === 'tsp' && tsp(sumNum)}
						{measureValue === 'tbsp' && tbsp(sumNum)}
						{measureValue === 'fl oz' && fl(sumNum)}
						{measureValue === 'c' && c(sumNum)}
						{measureValue === 'pt' && pt(sumNum)}
						{measureValue === 'qt' && qt(sumNum)}
						{measureValue === 'gal' && gal(sumNum)}
						{measureValue === 'ml' && ml(sumNum)}
						{measureValue === 'l' && l(sumNum)}
						{measureValue === 'kg' && kg(sumNum)}
						{measureValue === 'g' && g(sumNum)}
						{measureValue === 'mg' && mg(sumNum)}
						{measureValue === 'oz' && oz(sumNum)}
						{measureValue === 'lb' && lb(sumNum)}
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
							value={wholeNum}
							sx={{ width: '75px' }}
							onKeyDown={handleEnterPress}
							onChange={(event) => {
								!isNaN(event.target.value) && setWholeNum(event.target.value);
							}}
						/>
						<FormControl variant="standard" sx={{ minWidth: 80 }}>
							<InputLabel htmlFor="fraction-id" id="fraction-label">
								Fraction
							</InputLabel>
							<Select
								inputProps={{ id: 'fraction-id' }}
								labelId="fraction-label"
								id="fraction"
								name="fraction-name"
								defaultValue=""
								onKeyDown={handleEnterPress}
								onChange={(event) => {
									setFraction(event.target.value);
								}}>
								{fractions.map((fraction, i) => (
									<MenuItem key={i} value={fraction.value}>
										{fraction.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl variant="standard" sx={{ minWidth: 120 }}>
							<InputLabel htmlFor="measure-id" id="measure-label">
								Measurement
							</InputLabel>
							<Select
								inputProps={{ id: 'measure-id' }}
								labelId="measure-label"
								id="measure"
								name="measure-name"
								defaultValue=""
								onKeyDown={handleEnterPress}
								onChange={(event) => {
									setMeasureValue(event.target.value);
								}}
								label="measure">
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
