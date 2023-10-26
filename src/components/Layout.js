import { Box, Grid } from '@mui/material';
import SideBar from './Sidebar';
import Profile from './Profile';
import Contacts from './Contacts';

const Layout = ({ currentSection, selectedChat }) => {
  return (
    <>
      <Grid container height={'100vh'}>
        <Grid item>
          <SideBar currentSection={currentSection} />
        </Grid>
        <Grid item xs={3}>
          {currentSection === 'profile' && <Profile />}
          {currentSection === 'contacts' && <Contacts />}
        </Grid>
        <Grid item>
          <Box>
            {currentSection === 'chat' && <Chat chatId={selectedChat} />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
