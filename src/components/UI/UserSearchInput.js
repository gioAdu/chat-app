import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../API/api';

const UserSearchInput = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({ queryKey: ['users'], queryFn: getAllUsers });

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    if (searchValue.trim().length > 0) {
     const filteredUsers =  users.filter((user) => user.displayName.includes(searchValue));
     console.log(filteredUsers);
     
    }
  };

  return (
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
      id="filled-basic"
      sx={{
        backgroundColor: 'lightBg.main',
        paddingX: 2,
        paddingY: 1,
        borderRadius: 1,
      }}
      onChange={handleSearch}
      placeholder="Search users"
      variant="standard"
      size="small"
    />
  );
};

export default UserSearchInput;
