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

import { useRef } from 'react';

import { getCredentials } from '../../helpers/validators/getUserCredentials';

export default function FormDialog({ open, setOpen, handleSave }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const credentials = getCredentials(email, password);

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
              To update your Password, please enter your current email and password here.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              inputRef={emailRef}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              inputRef={passwordRef}
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
