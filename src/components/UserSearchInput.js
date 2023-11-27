import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UserSearchInput = () => {
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
      placeholder="Search users"
      variant="standard"
      size="small"
    />
  );
};

export default UserSearchInput;
