import { Box, List, ListItemButton, ListItemText, IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ChatIcon from '@mui/icons-material/Chat';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { useTheme } from 'next-themes';

import Link from 'next/link';

import { logoutFunc } from '../../firebase/Auth';

const SideBar = ({ setCurrentSection }) => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleClick = (section) => (event) => {
    localStorage.setItem('section', section);
    event.preventDefault();
    setCurrentSection(section);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutFunc();
    localStorage.removeItem('chat');
    localStorage.removeItem('section');
  };

  return (
    <List
      component="nav"
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: {
          xs: 'row',
          md: 'column',
        },
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(15,34,58,.12)',
        backgroundColor: 'lightBg.light_2',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'row',
            md: 'column',
          },
        }}
      >
        <ListItemButton
          onClick={handleClick('profile')}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <ManageAccountsIcon color="action" />
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton onClick={handleClick('Chats')} sx={{ display: 'flex', flexDirection: 'column' }}>
          <ChatIcon color="action" />
          <ListItemText primary="Chats" />
        </ListItemButton>
      </Box>

      <Box>
        <IconButton
          sx={{ width: '100%', borderRadius: 0 }}
          aria-label={`switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <Link href="/" onClick={handleLogout}>
          <ListItemButton>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </Link>
      </Box>
    </List>
  );
};

export default SideBar;