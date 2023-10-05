import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import {
	validatePassword,
	validateEmail,
	validateUsername,
} from '../Validations';
import './LogInForm.css';
import ErrorPage from '../ErrorPage';

export default function CreateAccountForm({
	setNewAccount,
	setGoodAccount,
	setCreateDisable,
}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [confirm, setConfirm] = useState('');

	const [confirmError, setConfirmError] = useState('');
	const [userError, setUserError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const badEmail = emailError !== '';
	const badUsername = userError !== '';
	const badConfirm = confirmError !== '';
	const badPassword = passwordError !== '';
	const goodAccount = !badConfirm && !badUsername && !badEmail && !badPassword;

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			if (!validateUsername(e.target.value.trim())) {
				setUserError(
					'Username must be between 6 - 30 characters and must be alphanumeric. (May use underscore and dot but cannot start or end with one)'
				);
				setCreateDisable(true);
			} else {
				setUserError('');
				setUsername(e.target.value.trim());
			}
		}
		if (e.target.name === 'password') {
			if (!validatePassword(e.target.value.trim())) {
				setPasswordError(
					'Password must contain one capital letter, one symbol, one lowercase letter, and be at least 8 characters long'
				);
				setCreateDisable(true);
			} else {
				setPasswordError('');
				setPassword(e.target.value.trim());
			}
		}
		if (e.target.name === 'email') {
			if (!validateEmail(e.target.value.trim())) {
				setEmailError('Invalid email address');
				setCreateDisable(true);
			} else {
				setEmailError('');
				setEmail(e.target.value.trim());
			}
		}
	};
	const handleConfirm = (e) => {
		if (e.target.value.trim() !== password) {
			setConfirmError('Passwords do not match');
			setCreateDisable(true);
		} else {
			setConfirmError('');
			setConfirm(e.target.value);
		}
	};
	const handleUsernameBlur = async () => {
		if (!badUsername && username !== '') {
			try {
				const res = await axios.post('http://localhost:3300/checkuser', {
					username: username,
				});
				if (res.data.length > 0) {
					setUserError(res.data);
					setCreateDisable(true);
				}
			} catch (err) {
				return <ErrorPage errorCode={err} />;
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
					setCreateDisable(true);
				}
			} catch (err) {
				return <ErrorPage errorCode={err} />;
			}
		}
	};
	useEffect(() => {
		if (confirm !== password) {
			setConfirmError('Passwords do not match');
			setCreateDisable(true);
		} else if (
			goodAccount &&
			username !== '' &&
			password !== '' &&
			email !== '' &&
			confirm !== ''
		) {
			setGoodAccount(true);
			setCreateDisable(false);
		}
		//used to make sure to capture all text in username and password fields.
		setNewAccount({ username: username, password: password, email: email });
	}, [
		password,
		setNewAccount,
		username,
		email,
		goodAccount,
		setGoodAccount,
		setCreateDisable,
		confirm,
	]);
	return (
		<Stack
			direction="column"
			spacing={2}
			justifyContent="center"
			alignItems="center"
			sx={{ marginTop: 2 }}>
			<TextField
				id={`username-${uuid()}`}
				name="username"
				label="Username"
				error={badUsername}
				helperText={badUsername ? userError : ''}
				onChange={handleChange}
				onBlur={handleUsernameBlur}
				variant="outlined"
				className="logInField"
				autoComplete="username"
				required
			/>
			<TextField
				id={`email-${uuid()}`}
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
				id={`password-${uuid()}`}
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
				id={`confirm-password-${uuid()}`}
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
