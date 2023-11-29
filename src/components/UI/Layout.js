import { Grid } from '@mui/material';
import SideBar from './Sidebar';
import Profile from './Profile';
import Chats from './Chats';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import { usePageHead } from '@/Context/HeadContext';

const Layout = () => {
  const router = useRouter();
  const { setTitle, setDescription } = usePageHead();

  const [currentSection, setCurrentSection] = useState();
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const sectionFromURL = router.query.section;
      const chatFromURL = router.query.chatId;
      const sectionFromStorage = localStorage.getItem('section');
      const chatFromStorage = localStorage.getItem('chat');

      setCurrentSection(sectionFromURL || sectionFromStorage || 'Chats');
      setSelectedChat(chatFromURL || chatFromStorage || null);
    }
  }, [router.isReady]);

  // Update state in local storage whenever it changes
  useEffect(() => {
    if (currentSection !== undefined) {
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
    <Grid container height={'100vh'}>
      <Grid item>
        <SideBar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </Grid>
      <Grid item xs={3}>
        {currentSection === 'profile' && <Profile />}
        {currentSection === 'Chats' && (
          <Chats setSelectedChat={setSelectedChat} />
        )}
      </Grid>
      <Grid item xs>
        {selectedChat && <ChatRoom chatId={selectedChat} />}
      </Grid>
    </Grid>
  );
};

export default Layout;
