import { useState } from 'react';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  ButtonBase,
  Collapse,
  InputLabel,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import FormDialog from '../Forms/credentialsModal';

const ProfileCard = ({
  firstName,
  email,
  cardOpen = true,
  editMode = false,
  setUserEmail,
  setName,
  handleSave,
  errorMsg,
}) => {
  const [open, setOpen] = useState(cardOpen);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleUpdate = () => {
    setOpenModal(true);
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
            paddingY: 1.2,
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
          <List sx={{ paddingX: 2 }}>
            {editMode ? (
              <TextField
                sx={{ marginBottom: 1.5 }}
                fullWidth
                label="name"
                value={firstName}
                onChange={handleNameChange}
              />
            ) : (
              listItem('name', firstName)
            )}
            {editMode ? (
              <TextField label="Email" fullWidth value={email} onChange={handleEmailChange} />
            ) : (
              listItem('Email', email)
            )}
          </List>

          {editMode && (
            <>
              {errorMsg && errorText()}

              <Box sx={{ textAlign: 'center', paddingY: 2 }}>
                <Button variant="contained" color="success" onClick={handleUpdate}>
                  Save
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
