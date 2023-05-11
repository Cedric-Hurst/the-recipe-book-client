import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function CreateAccountForm({setNewAccount}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    e.target.name === 'username' && setUsername(e.target.value);
    e.target.name === 'password' && setPassword(e.target.value);
    e.target.name === 'email' && setEmail(e.target.value);
  }
  const handleConfirm = (e) => {

  }
  useEffect(() => { //used to make sure to capture all text in username and password fields.
    setNewAccount({ username: username, password: password, email: email });
  },[password, setNewAccount, username, email])

  return (
    <Stack spacing={2} sx={{ marginTop: 2 }}>
      <TextField
        id="email"
        name="email"
        label="email"
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        id="username"
        name="username"
        label="Username"
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        onChange={handleConfirm}
        variant="outlined"
        required
      />
    </Stack>
  )
}