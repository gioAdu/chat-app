import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const SideBar = ({ setCurrentSection }) => {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = (section) => (event) => {
    event.preventDefault();
    setCurrentSection(section);
    router.push({
      pathname: router.pathname,
      query: { section: section },
    });
  };

  if (!mounted) return;

  return (
    <List
      component="nav"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(15,34,58,.12)',
        backgroundColor: 'lightBg.main',
      }}
    >
      <Box>
        <ListItemButton onClick={handleClick('profile')}>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton onClick={handleClick('contacts')}>
          <ListItemText primary="contacts" />
        </ListItemButton>
      </Box>

      <Box>
        <IconButton
          sx={{ width: '100%', borderRadius: 0 }}
          aria-label={`switch to ${
            resolvedTheme === 'light' ? 'dark' : 'light'
          } mode`}
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <Link href="/auth/signin">
          <ListItemButton>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </Link>
      </Box>
    </List>
  );
};

export default SideBar;
