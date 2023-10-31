import {
  Box,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Contacts = ({ setSelectedChat }) => {
  const TmpList = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Some Rando',
      lastMsg: 'Something',
      timeStamp: '2:40Pm',
    },
  ];
  return (
    <Box>
      <Typography paddingTop={1} paddingBottom={2} component="h1" variant="h4">
        Chats
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
        }}
        placeholder="Search users"
        variant="standard"
        size="small"
      />
      <Typography component="p" variant="h6" paddingTop={2}>
        Recent{' '}
      </Typography>
      <List>
        <ListItem>test</ListItem>
      </List>
    </Box>
  );
};

export default Contacts;
