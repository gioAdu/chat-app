import { Box, Grid } from '@mui/material';
import SideBar from './Sidebar';
import Profile from './Profile';
import Contacts from './Contacts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Layout = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  // Load state from local storage and URL on initial render
  useEffect(() => {
    const sectionFromStorage = localStorage.getItem('section');
    const chatFromStorage = localStorage.getItem('chat');
    const sectionFromURL = router.query.section;

    setCurrentSection(sectionFromStorage || sectionFromURL || 'contacts');
    setSelectedChat(chatFromStorage || null);
  }, []);

  // Update state in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('section', currentSection);
    if (selectedChat) {
      localStorage.setItem('chat', selectedChat);
    }
  }, [currentSection, selectedChat]);

  return (
    <Grid container height={'100vh'}>
      <Grid item>
        <SideBar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </Grid>
      <Grid item xs={3}>
        {currentSection === 'profile' && <Profile />}
        {currentSection === 'contacts' && (
          <Contacts setSelectedChat={setSelectedChat} />
        )}
      </Grid>
      <Grid item>
        <Box>{selectedChat && <Chat chatId={selectedChat} />}</Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
