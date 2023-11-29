import { Box, ListItem, ListItemButton } from '@mui/material';
import { auth } from '../firebase/config';
import Image from 'next/image';
import ContactCard from './Cards/ContactCard';

/**
 * Renders an incoming chat message component.
 *
 * @param {string} text - The text content of the message.
 * @param {string} imgSrc - The source URL of the profile image.
 * @param {number} index - The index of the message in the list.
 * @returns {React.Element} The rendered incoming chat message component.
 */
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

/**
 * Renders an outgoing chat message component.
 *
 * @param {string} text - The text content of the message.
 * @param {string} imgSrc - The image source URL for the profile picture.
 * @param {number} index - The unique index of the message.
 * @returns {React.Element} - The outgoing chat message component.
 */
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

/**
 * Generates an array of either outgoing or incoming messages, or null, depending on who sent the message.
 * based on the chat history and partner UID.
 * @param {Array} chatHistory - The chat history array.
 * @param {string} partnerUID - The UID of the chat partner.
 * @returns {Array} - An array of chat messages.
 */
export const chatMessages = (chatHistory, partnerUID) => {
  const currentUser = auth.currentUser;

  return chatHistory.map((item) => {
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

/**
 * Generates a chat list based on the provided chat history, users, and search term.
 * @param {Array} chatHistory - The array of chat history objects.
 * @param {Array} users - The array of user objects.
 * @param {Function} handleClick - The function to handle click events.
 * @param {string} [searchTerm=''] - The optional search term to filter the chat history.
 * @returns {Array} - The array of chat list components.
 */
export const generateChatList = (
  chatHistory,
  users,
  handleClick,
  searchTerm = ''
) => {
  const currentUser = auth.currentUser;
  const active = localStorage.getItem('chat');
  let filteredChatHistory = chatHistory;

  if (searchTerm) {
    filteredChatHistory = chatHistory.filter((item) => {
      const partner = users.find(
        (user) =>
          user.uid ===
          item.userUIDs.find((partner) => partner !== currentUser.uid)
      );
      return partner.displayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }

  return filteredChatHistory.map((item) => {
    const partner = users.find(
      (user) =>
        user.uid ===
        item.userUIDs.find((partner) => partner !== currentUser.uid)
    );

    return (
      <ListItemButton
        key={item.id}
        onClick={() => handleClick(partner.uid)}
        sx={{
          backgroundColor:
            active === partner.uid ? 'lightBg.lavender' : 'inherit',
        }}
      >
        <ContactCard item={item} partner={partner} />
      </ListItemButton>
    );
  });
};
