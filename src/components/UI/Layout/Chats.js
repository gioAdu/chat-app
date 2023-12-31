import { Box, CircularProgress, Grid, InputAdornment, List, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import UserSearchInput from '../UserSearchInput';
import { getAllUsers, useChatHistory } from '../../API/api';
import { useQuery } from '@tanstack/react-query';
import { generateChatList } from '../../helpers/UIHelper/ChatMessageComponents';

import { useState } from 'react';

import DynamicScrollBar from '@/components/helpers/UIHelper/DynamicScrollBar';

const Chats = ({ setSelectedChat }) => {
  const { chatHistory, isLoading } = useChatHistory();
  const [filterHistory, setFilterHistory] = useState('');

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

  const handleClick = (id) => {
    setSelectedChat(id);
  };

  const chatList = generateChatList(chatHistory, users, handleClick, filterHistory);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: {
          xs: 'none',
          md: '0 2px 4px rgba(15,34,58,.12)',
        },
        bgcolor: 'lightBg.light',
        height: '100%',
        paddingBottom: 2,
      }}
    >
      <Typography paddingX={3} paddingY={2} fontWeight="medium" component="h1" variant="h5">
        Chats
      </Typography>

      <Box paddingX={3}>
        <UserSearchInput getUserId={handleClick} />

        <Typography fontWeight={'medium'} component="h2" variant="h5" paddingTop={2}>
          Recent Conversations
        </Typography>

        <TextField
          onChange={(e) => setFilterHistory(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
            sx: {
              input: {
                padding: 0,
              },
            },
          }}
          id="search conversations"
          sx={{
            backgroundColor: 'lightBg.main',
            paddingX: 2,
            paddingY: 1,
            borderRadius: 1,
            marginY: 2,
          }}
          placeholder="Search conversations"
          variant="standard"
          size="small"
        />
      </Box>

      <Box sx={{ paddingX: 1, overflow: 'hidden' }}>
        <DynamicScrollBar>
          <List>{chatList}</List>
        </DynamicScrollBar>
      </Box>
    </Box>
  );
};

export default Chats;
