import { Grid } from '@mui/material';
import SideBar from './Sidebar';
import Profile from './Profile';
import Contacts from './Contacts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';

const Layout = () => {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState();
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const sectionFromURL = router.query.section;
      const chatFromURL = router.query.chatId;
      const sectionFromStorage = localStorage.getItem('section');
      const chatFromStorage = localStorage.getItem('chat');

      setCurrentSection(sectionFromURL || sectionFromStorage || 'contacts');
      setSelectedChat(chatFromURL || chatFromStorage || null);
    }
  }, [router.isReady]);

  // Update state in local storage whenever it changes
  useEffect(() => {
    if (currentSection !== undefined) {
      if (currentSection !== 'contacts' && currentSection !== 'profile') {
        router.push('/?section=contacts');
      } else if (selectedChat) {
        localStorage.setItem('chat', selectedChat);
        localStorage.setItem('section', currentSection);
        router.push({
          pathname: router.pathname,
          query: { section: currentSection, chatId: selectedChat },
        });
      } else {
        localStorage.setItem('section', currentSection);
        router.push({
          pathname: router.pathname,
          query: { section: currentSection },
        });
      }
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
      <Grid item xs={3} paddingX={3} bgcolor={'lightBg.light'}>
        {currentSection === 'profile' && <Profile />}
        {currentSection === 'contacts' && (
          <Contacts setSelectedChat={setSelectedChat} />
        )}
      </Grid>
      <Grid item xs>
        {selectedChat && <ChatRoom chatId={selectedChat} />}
      </Grid>
    </Grid>
  );
};

export default Layout;
