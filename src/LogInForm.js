import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function LogInForm({ setAccount }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    e.target.name === 'username' && setUsername(e.target.value);
    e.target.name === 'password' && setPassword(e.target.value);
  }
  useEffect(() => { //used to make sure to capture all text in username and password fields.
    setAccount({ username: username, password: password });
  },[password, setAccount, username])

  return (
    <Stack spacing={2} sx={{marginTop: 2}}>
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
    </Stack>
  )
}