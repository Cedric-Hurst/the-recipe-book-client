import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import './LogInForm.css';

export default function EditAccountForm({
	setGoodAccount,
	setUpdatedAccount,
	setUpdateDisable,
}) {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [confirm, setConfirm] = useState('');

	const [confirmError, setConfirmError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

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
				setUpdateDisable(true);
			} else {
				setPasswordError('');
				setPassword(e.target.value.trim());
			}
		}
		if (e.target.name === 'email') {
			if (!validateEmail(e.target.value.trim())) {
				setEmailError('Invalid email address');
				setUpdateDisable(true);
			} else {
				setEmailError('');
				setEmail(e.target.value.trim());
			}
		}
		if (e.target.name === 'confirmPassword') {
			if (e.target.value.trim() !== password) {
				setConfirmError('Passwords do not match');
				setUpdateDisable(true);
			} else {
				setConfirmError('');
				setConfirm(e.target.value);
			}
		}
	};
	const handleEmailBlur = async () => {
		if (!badEmail && email !== '') {
			try {
				const res = await axios.post('http://localhost:3300/checkuser', {
					email: email,
				});
				if (res.data.length > 0) {
					setEmailError(res.data);
					setUpdateDisable(true);
				}
			} catch (err) {
				console.log(err);
			}
		}
		if (email === '') {
			setEmailError('');
		}
	};
	const handlePasswordBlur = () => {
		if (password === '') {
			setPasswordError('');
		}
	};
	const handleConfirmBlur = () => {
		if (confirm === '') {
			setConfirmError('');
		}
	};
	useEffect(() => {
		if (confirm !== password) {
			setConfirmError('Passwords do not match');
			setUpdateDisable(true);
		} else if (
			goodAccount &&
			((password !== '' && confirm !== '') || email !== '')
		) {
			setGoodAccount(true);
			setUpdateDisable(false);
		}
		//used to make sure to capture all text in username and password fields.
		setUpdatedAccount({ password: password, email: email });
	}, [
		password,
		email,
		setUpdatedAccount,
		confirm,
		goodAccount,
		setGoodAccount,
		setUpdateDisable,
	]);
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
				onBlur={handleEmailBlur}
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
				onBlur={handlePasswordBlur}
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
				onChange={handleChange}
				onBlur={handleConfirmBlur}
				variant="outlined"
				className="logInField"
				type="password"
				autoComplete="new-password"
				required
			/>
		</Stack>
	);
}
