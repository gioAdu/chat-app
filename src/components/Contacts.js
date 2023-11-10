import {
  Box,
  InputAdornment,
  List,
  ListItemButton,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatCard from './UI/ChatCard';
import { useRef } from 'react';

const TmpList = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Some Rando',
    lastMsg: 'Something',
    timeStamp: '2:40PM',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Second Rando',
    lastMsg: 'Something Else Entirely',
    timeStamp: '2:40PM',
  },
];

const Contacts = ({ setSelectedChat }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus()
  }

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

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon onClick={handleClick}/>
            </InputAdornment>
          ),
          disableUnderline: true,
          sx: {
            input: {
              padding: 0,
            },
          },
        }}
        fullWidth
        id="filled-basic"
        sx={{
          backgroundColor: 'lightBg.main',
          paddingX: 2,
          paddingY: 1,
          borderRadius: 1,
        }}
        placeholder="Search users"
        variant="standard"
        size="small"
        inputRef={inputRef}
      />
      <Typography component="p" variant="h6" paddingTop={2}>
        Recent
      </Typography>
      <List>
        {TmpList.map((item) => (
          <ListItemButton key={item.id}>
            <ChatCard item={item} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Contacts;
