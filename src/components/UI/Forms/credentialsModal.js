import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

import { useState } from 'react';

import { getCredentials } from '../../helpers/validators/getUserCredentials';

export default function FormDialog({ open, setOpen, handleSave }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = getCredentials(email, password);
    console.log(open);
    setOpen(false);
    handleSave(credentials);
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter your credentials</DialogTitle>

        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              To update your profile, please enter your current email and password here.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button type="submit">Submit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
