import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './LogInForm.css';

export default function EditAccountForm({
	allUsers,
	setGoodAccount,
	setUpdatedAccount,
	updatedAccount,
}) {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const [confirmError, setConfirmError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const allEmails = allUsers.map((user) => {
		return user.email.toLowerCase();
	});
	const badEmail = emailError !== '';
	const badConfirm = confirmError !== '';
	const badPassword = passwordError !== '';
	const goodAccount = !badConfirm && !badEmail && !badPassword;
	function checkPassword(str) {
		let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		return re.test(str);
	}
	function validateEmail(email) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}
	const handleChange = (e) => {
		if (e.target.name === 'password') {
			if (!checkPassword(e.target.value.trim())) {
				setPasswordError(
					'Password must contain one capital letter, one symbol, one lowercase letter, and be at least 8 characters long'
				);
			} else {
				setPasswordError('');
				setPassword(e.target.value.trim());
			}
		}
		if (e.target.name === 'email') {
			if (allEmails.includes(e.target.value.trim().toLowerCase()))
				setEmailError('Email already attached to an account');
			else if (!validateEmail(e.target.value.trim()))
				setEmailError('Invalid email address');
			else {
				setEmailError('');
				setEmail(e.target.value.trim());
			}
		}
		if (goodAccount && password !== '' && email !== '') {
			setGoodAccount(true);
		}
	};
	const handleConfirm = (e) => {
		if (e.target.value.trim() !== password) {
			setConfirmError('Passwords do not match');
		} else {
			setConfirmError('');
		}
	};
	useEffect(() => {
		//used to make sure to capture all text in username and password fields.
		setUpdatedAccount({ password: password, email: email });
	}, [password, email, setUpdatedAccount]);
	return (
		<Stack
			direction="column"
			spacing={2}
			justifyContent="center"
			alignItems="center"
			sx={{ marginTop: 2 }}>
			<TextField
				id="email"
				name="email"
				label="Email"
				error={badEmail}
				helperText={badEmail ? emailError : ''}
				onChange={handleChange}
				variant="outlined"
				className="logInField"
				autoComplete="email"
				required
			/>
			<TextField
				id="password"
				name="password"
				label="Password"
				error={badPassword}
				helperText={badPassword ? passwordError : ''}
				onChange={handleChange}
				variant="outlined"
				className="logInField"
				type="password"
				autoComplete="new-password"
				required
			/>
			<TextField
				id="confirmPassword"
				name="confirmPassword"
				label="Confirm Password"
				error={badConfirm}
				helperText={badConfirm ? confirmError : ''}
				onChange={handleConfirm}
				variant="outlined"
				className="logInField"
				type="password"
				autoComplete="new-password"
				required
			/>
		</Stack>
	);
}
