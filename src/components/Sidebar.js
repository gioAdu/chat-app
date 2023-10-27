import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SideBar = ({ currentSection, setCurrentSection }) => {
  const router = useRouter();
  
  const handleClick = (section) => (event) => {
    event.preventDefault();
    setCurrentSection(section);

    router.push({
      pathname: router.pathname,
      query: section,
   });
  };

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
        <ListItemButton onClick={handleClick('profile')}>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton onClick={handleClick('contacts')}>
          <ListItemText primary="contacts" />
        </ListItemButton>
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
