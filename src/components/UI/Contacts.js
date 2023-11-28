import {
  Box,
  CircularProgress,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContactCard from './ContactCard';
import UserSearchInput from './UserSearchInput';
import { getAllUsers, getchatHistory } from '../API/api';
import { useQuery } from '@tanstack/react-query';
import { auth } from '../firebase/config';
import { generateChatList } from './ChatMessageComponents';

const Contacts = ({ setSelectedChat }) => {
  const currentUser = auth.currentUser;
  const {
    data: chatHistory,
    isLoading,
    error,
  } = useQuery({ queryKey: ['chatHistory'], queryFn: getchatHistory });

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

  const chatList = generateChatList(chatHistory, users, handleClick);

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

      <UserSearchInput />

      <Typography component="p" variant="h6" paddingTop={2}>
        Recent
      </Typography>
      <TextField
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
        id="filled-basic"
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
