import { auth } from '@/components/firebase/config';

import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import ProfileCard from '../Cards/ProfileCard';
import { useState } from 'react';
import { updateUserInfo } from '@/components/API/api';
import FormDialog from '@/components/UI/credentialsModal';

const Profile = () => {
  const currentUser = auth.currentUser;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [editMode, setEditMode] = useState(false);
  const [firstName, setName] = useState(currentUser.displayName);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    const result = await updateUserInfo(firstName, userEmail);
    console.log(result);
    setEditMode(false);   
  }


  return (
    <Box sx={{ paddingX: 3, backgroundColor: 'lightBg.light', height: '100dvh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography component={'h1'} variant="h5" sx={{ paddingY: 2 }}>
          My Profile
        </Typography>
        <FormDialog/>

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
              setEditMode(true), handleClose();
            }}
          >
            Edit Profile
          </MenuItem>
        </Menu>
      </Box>

      <ProfileCard
        editMode={editMode}
        handleSave={handleSave}
        displayName={currentUser.displayName}
        email={userEmail}
        firstName={firstName}
        setName={setName}
        setUserEmail={setUserEmail}
      />
    </Box>
  );
};

export default Profile;
