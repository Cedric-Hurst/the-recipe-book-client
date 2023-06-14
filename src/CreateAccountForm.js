import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './LogInForm.css';

export default function CreateAccountForm({
	setNewAccount,
	errMessage,
	allUsers,
}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [passError, setPassError] = useState('');
	const [userError, setUserError] = useState('');
	const allUsernames = allUsers.map((user) => {
		return user.username.toLowerCase();
	});
	const handleChange = (e) => {
		if (e.target.name === 'username') {
			if (allUsernames.includes(e.target.value.toLowerCase())) {
				setUserError('Username already in use');
			} else {
				setUserError('');
				setUsername(e.target.value);
			}
		}
		e.target.name === 'password' && setPassword(e.target.value);
		e.target.name === 'email' && setEmail(e.target.value);
	};
	const handleConfirm = (e) => {
		if (e.target.value !== password) {
			setPassError('Passwords do not match');
		} else {
			setPassError('');
		}
	};
	useEffect(() => {
		//used to make sure to capture all text in username and password fields.
		setNewAccount({ username: username, password: password, email: email });
	}, [password, setNewAccount, username, email]);
	const badEmail = errMessage === 'Email already attached to an account';
	const badUsername = userError === 'Username already in use';
	const badPassword = passError === 'Passwords do not match';
	return (
		<Stack
			direction="column"
			spacing={2}
			justifyContent="center"
			alignItems="center"
			sx={{ marginTop: 2 }}>
			<TextField
				id="username"
				name="username"
				label="Username"
				error={badUsername}
				helperText={badUsername ? userError : ''}
				onChange={handleChange}
				variant="outlined"
				className="logInField"
				autoComplete="username"
				required
			/>
			<TextField
				id="email"
				name="email"
				label="Email"
				error={badEmail}
				helperText={badEmail ? errMessage : ''}
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
				error={badPassword}
				helperText={badPassword ? passError : ''}
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
