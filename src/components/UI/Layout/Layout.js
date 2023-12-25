import { Grid, useMediaQuery } from '@mui/material';
import SideBar from './Sidebar';
import Profile from './Profile';
import Chats from './Chats';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatRoom from './ChatRoomController';
import { useCtx } from '@/Context/AppContext';
import { useTheme } from '@emotion/react';

const Layout = () => {
  const router = useRouter();
  const { setTitle, setDescription } = useCtx();
  const { selectedChat, setSelectedChat } = useCtx();
  const [currentSection, setCurrentSection] = useState();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (router.isReady) {
      const sectionFromURL = router.query.section;
      const sectionFromStorage = localStorage.getItem('section');
      const chatFromStorage = localStorage.getItem('chat');
      setCurrentSection(sectionFromURL || sectionFromStorage || 'Chats');
      setSelectedChat(chatFromStorage || null);
    }
  }, [router.isReady]);

  // Update state in local storage whenever it changes
  useEffect(() => {
    if (currentSection == undefined) return;
    if (currentSection !== 'Chats' && currentSection !== 'profile') {
      router.push('/?section=Chats');
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
  }, [currentSection, selectedChat]);

  useEffect(() => {
    if (currentSection === 'Chats') {
      setTitle('Chats');
      setDescription(
        'Discover your network on the Chats page. View your chat history, keep up with ongoing conversations, or start new ones. Use the search feature to find and connect with other users. Your next conversation is just a click away!'
      );
    } else if (currentSection === 'profile') {
      setTitle('Profile');
      setDescription('Update your profile information and settings.');
    }
  }, [currentSection]);

  return (
    <Grid container height={'100dvh'} alignContent={'start'}>
      <Grid item xs={12} md="auto" sx={{ height: isSmallScreen ? 'fit-content' : '100dvh' }}>
        <SideBar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      </Grid>

      <Grid item xs={12} md={4} lg={3} sx={{ flexGrow: 1, maxHeight: '100dvh' }}>
        {currentSection === 'profile' && <Profile />}
        {currentSection === 'Chats' && <Chats setSelectedChat={setSelectedChat} />}
      </Grid>

      {selectedChat && (
        <Grid item xs>
          <ChatRoom chatId={selectedChat} />
        </Grid>
      )}
    </Grid>
  );
};

export default Layout;
