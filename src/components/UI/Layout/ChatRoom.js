import { Box, CircularProgress, Drawer, Grid, useMediaQuery, useTheme } from '@mui/material';

import { useQuery } from '@tanstack/react-query';

import { addConversation, getAllUsers, useChatHistory } from '../../API/api';
import { chatMessages } from '../../helpers/UIHelper/ChatMessageComponents';
import { useEffect, useRef, useState } from 'react';
import DesktopChatRoom from '../DesktopChatRoom';
import MobileChatRoom from '../MobileChatRoom';
import { useCtx } from '@/Context/AppContext ';

const drawerWidth = 300;

const ChatRoom = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const lastChatMessageRef = useRef(null);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToBottom = () => {
    lastChatMessageRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const { chatHistory, isLoading } = useChatHistory();

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatId, isMobile]);

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

  const messageHistory = chatMessages(chatHistory, partner.uid, lastChatMessageRef);

  const handleClick = async () => {
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
    <Box sx={{ height: '100%' }}>
      {!isMobile ? (
        <DesktopChatRoom
          partner={partner}
          chatMessages={messageHistory}
          open={open}
          setOpen={setOpen}
          setMessage={setMessage}
          message={message}
          handleClose={handleClose}
          handleClick={handleClick}
        />
      ) : (
        <MobileChatRoom
          drawerWidth={drawerWidth}
          chatMessages={messageHistory}
          partner={partner}
          open={open}
          setOpen={setOpen}
          setMessage={setMessage}
          message={message}
          handleClose={handleClose}
          handleClick={handleClick}
        />
      )}
    </Box>
  );
};

export default ChatRoom;
