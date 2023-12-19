import { auth } from '@/components/firebase/config';

import { Alert, Box, IconButton, Menu, MenuItem, Snackbar, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ProfileCard from '../Cards/ProfileCard';
import { useState } from 'react';
import { updateUserInfo } from '@/components/API/api';
import { getErrorText } from '@/components/helpers/validators/fb-signup';

const Profile = () => {
  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email;

  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [firstName, setName] = useState(currentUser.displayName);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileUpdate = async () => {
    try {
      const result = await updateUserInfo(firstName);
      setEditProfile(false);
      setError(null);
      setSuccess(result);
    } catch (error) {
      const errorText = getErrorText(error.code);
      setError(errorText);
      setSuccess(null);
    }
  };

  return (
    <Box sx={{ paddingX: 3, paddingBottom: 2, backgroundColor: 'lightBg.light', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography component={'h1'} variant="h5" sx={{ paddingY: 2 }}>
          My Profile
        </Typography>

        <IconButton
          id="edit-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'edit-button',
          }}
        >
          <MenuItem
            onClick={() => {
              setEditProfile(true), setEditPassword(false), handleClose();
            }}
          >
            Edit Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              setEditPassword(true), setEditProfile(false), handleClose();
            }}
          >
            Change Password
          </MenuItem>
        </Menu>
      </Box>

      <ProfileCard
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        editPassword={editPassword}
        setSuccess={setSuccess}
        setEditPassword={setEditPassword}
        handleProfileUpdate={handleProfileUpdate}
        displayName={currentUser.displayName}
        email={userEmail}
        firstName={firstName}
        setName={setName}
        errorMsg={error}
        setErrorMsg={setError}
        successMsg={success}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
