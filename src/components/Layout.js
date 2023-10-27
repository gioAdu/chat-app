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

  useEffect(() => {
    if (router.isReady) {
      const sectionFromURL = router.query.section;
      const sectionFromStorage = localStorage.getItem('section');
      const chatFromStorage = localStorage.getItem('chat');
      setCurrentSection(sectionFromURL || sectionFromStorage || 'contacts');
      setSelectedChat(chatFromStorage || null);
    }
  }, [router.isReady]);

  // Update state in local storage whenever it changes
  useEffect(() => {
    console.log(currentSection);
    if (router.isReady) {
      localStorage.setItem('section', currentSection);
      router.push({
        pathname: router.pathname,
        query: { section: currentSection },
      });
    }

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
