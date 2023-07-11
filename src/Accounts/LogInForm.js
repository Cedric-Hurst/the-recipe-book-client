import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { v4 as uuid } from 'uuid';
import './LogInForm.css';

export default function LogInForm({ setAccount, badUser }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = (e) => {
		e.target.name === 'username' && setUsername(e.target.value);
		e.target.name === 'password' && setPassword(e.target.value);
	};
	useEffect(() => {
		//used to make sure to capture all text in username and password fields.
		setAccount({ username: username, password: password });
	}, [setAccount, password, username]);

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
				error={badUser}
				helperText={badUser ? 'Wrong Username or Password' : ''}
				onChange={handleChange}
				variant="outlined"
				className="logInField"
				autoComplete="username"
				required
			/>
			<TextField
				id={`password-${uuid()}`}
				name="password"
				label="Password"
				onChange={handleChange}
				variant="outlined"
				className="logInField"
				type="password"
				autoComplete="current-password"
				required
			/>
		</Stack>
	);
}
