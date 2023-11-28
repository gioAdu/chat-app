import { Box, ListItem, ListItemButton } from '@mui/material';
import { auth } from '../firebase/config';
import Image from 'next/image';
import ContactCard from './ContactCard';

export const incomingMsg = (text, imgSrc, index) => (
  <ListItem key={index} sx={{ justifyContent: 'flex-start' }}>
    <Box display={'flex'} alignItems={'end'} gap={1}>
      <Box
        sx={{
          minWidth: 36,
          height: 36,
          borderRadius: 50,
          overflow: 'hidden',
        }}
      >
        <Image
          src={imgSrc || '/default_profile.png'}
          width={36}
          height={36}
          alt="profile"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: 'lightBg.indigo',
          color: 'white',
          padding: 2,
          borderRadius: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 4,
            left: -9,
            borderBottom: `5px solid transparent`,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid #7269ef',
            borderTop: '5px solid  #7269ef',
          },
        }}
      >
        {text}
      </Box>
    </Box>
  </ListItem>
);

export const outGoingMsg = (text, imgSrc, index) => (
  <ListItem key={index} sx={{ justifyContent: 'flex-end' }}>
    <Box display={'flex'} alignItems={'end'} gap={1}>
      <Box
        sx={{
          backgroundColor: 'lightBg.indigo',
          color: 'white',
          padding: 2,
          borderRadius: 2,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 4,
            right: -9,
            borderBottom: `5px solid  transparent`,
            borderLeft: '5px solid  #7269ef',
            borderRight: '5px solid transparent',
            borderTop: '5px solid  #7269ef',
          },
        }}
      >
        {text}
      </Box>
      <Box
        sx={{
          minWidth: 36,
          height: 36,
          borderRadius: 50,
          overflow: 'hidden',
        }}
      >
        <Image
          src={imgSrc || '/default_profile.png'}
          width={36}
          height={36}
          alt="profile"
        />
      </Box>
    </Box>
  </ListItem>
);

export const chatMessages = (chatHistory, partnerUID) => {
  const currentUser = auth.currentUser;

  return chatHistory.map((item, index) => {
    if (!item.userUIDs.includes(partnerUID)) {
      return null;
    }

    return item.messages.map((message, messageIndex) => {
      if (currentUser.uid === message.senderUID) {
        return outGoingMsg(message.content, message.img, messageIndex);
      } else {
        return incomingMsg(message.content, message.img, messageIndex);
      }
    });
  });
};

export const generateChatList = (chatHistory, users, handleClick) => {
  const currentUser = auth.currentUser;
  
  return chatHistory.map((item) => {
    const partner = users.find(
      (user) =>
        user.uid ===
        item.userUIDs.find((partner) => partner !== currentUser.uid)
    );

    return (
      <ListItemButton key={item.id} onClick={() => handleClick(partner.uid)}>
        <ContactCard item={item} partner={partner} />
      </ListItemButton>
    );
  });
};
