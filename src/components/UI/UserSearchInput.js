import {
  Box,
  CircularProgress,
  ClickAwayListener,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  Popper,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { addConversation, getAllUsers } from '../API/api';
import { useState } from 'react';
import SearchCard from './Cards/SearchCard';
import { auth } from '../firebase/config';

const UserSearchInput = ({ getUserId }) => {
  const currentUser = auth.currentUser;

  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [preventClose, setPreventClose] = useState(false);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({ queryKey: ['users'], queryFn: getAllUsers });

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100dvh">
        <CircularProgress color="secondary" size={80} />
      </Grid>
    );
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    if (searchValue.trim().length > 0) {
      const tmpFilteredList = users.filter(
        (user) => user.displayName.includes(searchValue) && user.uid !== currentUser.uid
      );

      setFilteredUsers(tmpFilteredList);
      setAnchorEl(e.currentTarget);
    } else {
      setFilteredUsers([]);
      setAnchorEl(null);
    }
  };

  const handleSelect = async (option) => {
    // Handle the selection
    await addConversation(option);
    localStorage.setItem('chat', option);
    getUserId(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    if (!preventClose) {
      setAnchorEl(null);
    }
    setPreventClose(false);
  };

  const handleClick = (event) => {
    const textFieldValue = event.target.value;

    if (textFieldValue !== '') {
      setPreventClose(true);
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <Box position={'relative'}>
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
        fullWidth
        id="search users"
        sx={{
          backgroundColor: 'lightBg.main',
          paddingX: 2,
          paddingY: 1,
          borderRadius: 1,
        }}
        onChange={handleSearch}
        onFocus={handleClick}
        placeholder="Search users"
        variant="standard"
        size="small"
      />
      <ClickAwayListener onClickAway={handleClose}>
        <Popper
          role="presentation"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom"
          disablePortal
          sx={{ zIndex: 5, width: '90%' }}
          modifiers={[{ name: 'offset', options: { offset: [0, 9] } }]}
        >
          <Box sx={{ backgroundColor: 'lightBg.main', padding: '0!important' }}>
            <List>
              {filteredUsers.map((user) => (
                <ListItemButton key={user.uid} onClick={() => handleSelect(user.uid)}>
                  <SearchCard item={user} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Popper>
      </ClickAwayListener>
    </Box>
  );
};

export default UserSearchInput;
