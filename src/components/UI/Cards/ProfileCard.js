import { useRef, useState } from 'react';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  ButtonBase,
  Collapse,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import FormDialog from '../Forms/credentialsModal';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {  updateUserPassword } from '@/components/API/api';

const ProfileCard = ({
  firstName,
  email,
  cardOpen = true,
  editProfile = false,
  setEditProfile,
  editPassword = false,
  setEditPassword,
  setName,
  handleProfileUpdate,
  errorMsg,
  setErrorMsg,
  setSuccess,
}) => {
  const [open, setOpen] = useState(cardOpen);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let passwordRef = useRef(null);
  let confirmPasswordRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUpdate = () => {
    if (editProfile) {
      handleProfileUpdate();
      setEditProfile(false);
      return;
    }

    if (!editPassword) return;

    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    } else if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters');
      return;
    }

    setOpenModal(true);
  };

  const handleSave = async (credentials) => {
    const password = passwordRef.current.value.trim();
    try {
      await updateUserPassword(password, credentials);
    } catch (error) {
      return console.error(error);
    }

    setSuccess('Password updated successfully');
    setEditPassword(false);
  };

  const listItem = (label, value) => {
    return (
      <ListItem
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 0.6, paddingX: 0 }}
      >
        <InputLabel sx={{ fontSize: '15px' }}>{label}</InputLabel>
        <Typography sx={{ fontSize: '14px', fontWeight: 'medium' }}>{value}</Typography>
      </ListItem>
    );
  };

  const errorText = () => {
    return (
      <Typography sx={{ paddingTop: 1, textAlign: 'center', color: 'error.main' }}>
        {errorMsg}
      </Typography>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
        <Box sx={{ borderRadius: '50%', overflow: 'hidden', width: 100, height: 100 }}>
          <Image src={'/default_profile.webp'} width={100} height={100} alt="profile" />
        </Box>

        <Typography component="h1" variant="h5" sx={{ fontWeight: 'medium', paddingY: 1 }}>
          {firstName}
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'lightBg.paper', border: '1px solid', borderColor: 'lightBg.main' }}>
        <ButtonBase
          onClick={handleClick}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingY: 1.5,
            paddingX: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <PersonOutlineIcon />
              <Typography>About</Typography>
            </Box>
          </Box>

          <Box sx={{ rotate: open ? '180deg' : '0', transition: 'all 0.2s' }}>
            <KeyboardArrowDownIcon />
          </Box>
        </ButtonBase>

        <Collapse in={open}>
          <List sx={{ paddingX: 2, paddingTop: 0 }}>
            {editProfile && (
              <TextField
                sx={{ marginBottom: 1.5 }}
                fullWidth
                label="name"
                value={firstName}
                onChange={handleNameChange}
              />
            )}

            {!editProfile && !editPassword && (
              <>
                {listItem('name', firstName)}
                {listItem('Email', email)}
              </>
            )}

            {editPassword && (
              <>
                <TextField
                  inputRef={passwordRef}
                  sx={{ marginY: 1.5 }}
                  label="password"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  inputRef={confirmPasswordRef}
                  label="repeat password"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
          </List>

          {(editPassword || editProfile) && (
            <>
              {errorMsg && errorText()}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                  padding: 2,
                  gap: 2,
                }}
              >
                <Button variant="contained" color="success" onClick={handleUpdate}>
                  Save
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setEditPassword(false), setEditProfile(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>

              <FormDialog open={openModal} setOpen={setOpenModal} handleSave={handleSave} />
            </>
          )}
        </Collapse>
      </Box>
    </>
  );
};

export default ProfileCard;
