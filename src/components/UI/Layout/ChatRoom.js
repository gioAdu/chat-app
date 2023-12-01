import { Box, CircularProgress, Grid, IconButton, List, TextField, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Send } from '@mui/icons-material';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';

import { addConversation, getAllUsers, useChatHistory } from '../../API/api';
import { chatMessages } from '../../helpers/UIHelper/ChatMessageComponents';
import { useEffect, useRef, useState } from 'react';
import PersistentDrawer from '../PersistentDrawer';

const drawerWidth = 300;

const ChatRoom = ({ chatId }) => {
  const textRef = useRef(null);
  const lastChatMessageRef = useRef(null);
  const [open, setOpen] = useState(false);

  const scrollToBottom = () => {
    lastChatMessageRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const { chatHistory, isLoading } = useChatHistory();

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatId]);

  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({ queryKey: ['users'], queryFn: getAllUsers });

  if (isLoading || usersIsLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100dvh">
        <CircularProgress color="secondary" size={80} />
      </Grid>
    );
  }

  const partner = users.find((user) => user.uid === chatId);

  const handleClick = async () => {
    const message = textRef.current.value;

    if (message.trim() === '') return;

    try {
      await addConversation(chatId, message);
      textRef.current.value = '';
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  return (
    <Grid
      container
      direction={'column'}
      boxShadow={'0 2px 4px rgba(15,34,58,.12)'}
      bgcolor={'lightBg.dark'}
      height={'100dvh'}
      sx={{ paddingRight: open ? `${drawerWidth}px` : 0 }}
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
        <List>{chatMessages(chatHistory, partner.uid, lastChatMessageRef)}</List>
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

export default ChatRoom;
