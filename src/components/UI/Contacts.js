import {
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  List,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserSearchInput from './UserSearchInput';
import { getAllUsers, useChatHistory } from '../API/api';
import { useQuery } from '@tanstack/react-query';
import { generateChatList } from './ChatMessageComponents';
import { useState } from 'react';

const Contacts = ({ setSelectedChat }) => {
  const { chatHistory, isLoading } = useChatHistory();
  const [filterHistory, setFilterHistory] = useState('');

  const {
    data: users,
    isLoading: usersIsLoading,
    error: usersError,
  } = useQuery({ queryKey: ['users'], queryFn: getAllUsers });

  if (isLoading || usersIsLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress color="secondary" size={80} />
      </Grid>
    );
  }

  const handleClick = (id) => {
    setSelectedChat(id);
  };

  const chatList = generateChatList(
    chatHistory,
    users,
    handleClick,
    filterHistory
  );

  return (
    <Box>
      <Typography
        paddingTop={2}
        fontWeight="medium"
        paddingBottom={2}
        component="h1"
        variant="h5"
      >
        Chats
      </Typography>

      <UserSearchInput getUserId={handleClick} />

      <Typography component="p" variant="h6" paddingTop={2}>
        Recent
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
          marginY: 1,
        }}
        placeholder="Search conversations"
        variant="standard"
        size="small"
      />

      <List sx={{ paddingY: 0 }}>{chatList}</List>
    </Box>
  );
};

export default Contacts;
