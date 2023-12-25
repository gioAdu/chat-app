import { useRef, useState } from 'react';

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import { resetPassword } from '@/components/API/api';
import { validateEmail } from '@/components/helpers/validators/validateForm';

const RecoverModal = ({ open, setOpen, setSuccess }) => {
  const emailRef = useRef(null);
  const [error, setError] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();

    const emailError = validateEmail(email);

    if (emailError) {
      return setError('Enter correct Email');
    }

    setError(false);
    await resetPassword(email);
    setSuccess('Password recovery email has been sent. Please check your inbox.');
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Enter your email</DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            inputRef={emailRef}
            error={!!error}
            helperText={error}
          />
        </DialogContent>

        <DialogActions>
          <Button type="submit">Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default RecoverModal;
