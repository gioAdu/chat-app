import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

const SideBar = () => {
  return (
    <List
      component="nav"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Link href="/Profile">
          <ListItemButton>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </Link>

        <Link href="/Contacts">
          <ListItemButton>
            <ListItemText primary="contacts" />
          </ListItemButton>
        </Link>
      </Box>
      <Link href="#">
        <ListItemButton>
          <ListItemText primary="Log out" />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default SideBar;
