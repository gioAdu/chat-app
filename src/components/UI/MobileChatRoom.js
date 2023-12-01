import { Box, Grid, IconButton, List, TextField, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Image from 'next/image';

import { useRef } from 'react';
import PersistentDrawer from './PersistentDrawer';
import { Send } from '@mui/icons-material';
import { useCtx } from '@/Context/AppContext ';

const MobileChatRoom = ({
  drawerWidth,
  partner,
  handleClose,
  chatMessages,
  setOpen,
  open,
  handleClick,
}) => {
  const textRef = useRef(null);
  const { setMobileChat } = useCtx();

  const handleDrawer = () => {
    setMobileChat(false);
  }

  return (
    <Grid
      container
      direction={'column'}
      boxShadow={'0 2px 4px rgba(15,34,58,.12)'}
      sx={{
        paddingRight: open ? `${drawerWidth}px` : 0,
        height: '100dvh',
        backgroundColor: 'lightBg.dark',
        boxShadow: '0 2px 4px rgba(15,34,58,.12)',
        flexDirection: 'column',
        width: '100vw',
      }}
    >
      <Grid
        p={2}
        item
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        marginBottom={1}
        paddingBottom={2}
        borderBottom={1}
        borderColor={'lightBg.main'}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleDrawer}>
          <ChevronLeftIcon/>
          </IconButton>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 50,
              overflow: 'hidden',
            }}
          >
            <Image src={'/default_profile.webp'} width={50} height={50} alt="profile" />
          </Box>

          <Typography fontWeight={'bold'} component={'h5'}>
            {partner?.displayName || 'User'}
          </Typography>
        </Box>

        <IconButton sx={{ marginRight: 5 }} onClick={handleClose}>
          <PersonOutlineIcon fontSize="large" />
        </IconButton>
      </Grid>

      <Grid item xs style={{ flexGrow: 1, overflow: 'auto' }} p={2} pt={0}>
        <List>{chatMessages}</List>
      </Grid>

      <PersistentDrawer
        open={open}
        setOpen={setOpen}
        displayName={partner.displayName}
        email={partner.email}
        handleClose={handleClose}
        drawerWidth={drawerWidth}
      />

      <Grid
        item
        py={2}
        px={3}
        borderTop={1}
        borderColor={'lightBg.main'}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
        gap={2}
      >
        <TextField
          InputProps={{ disableUnderline: true }}
          inputRef={textRef}
          fullWidth
          id="filled-basic"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleClick();
            }
          }}
          sx={{
            backgroundColor: 'lightBg.main',
            paddingX: 2,
            paddingY: 1,
            borderRadius: 1,
          }}
          placeholder="Enter message..."
          variant="standard"
        />
        <IconButton
          onClick={handleClick}
          sx={{
            padding: 1.5,
            backgroundColor: 'lightBg.indigo',
            color: 'white',
            borderRadius: 1.5,
            '&:hover': {
              backgroundColor: 'lightBg.indigo',
            },
          }}
        >
          <Send />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MobileChatRoom;
