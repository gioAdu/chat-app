import { Send } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TmpList = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Some Rando',
    lastMsg: 'Something',
    timeStamp: '2:40PM',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Second Rando',
    lastMsg: 'Something Else Entirely',
    timeStamp: '2:40PM',
  },
];

const ChatRoom = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState();

  useEffect(() => {
    setLoading(false);
    setSelectedChat(TmpList.find((item) => item.id == chatId));
  }, [chatId]);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Grid>
    );
  }

  const incomingMsg = (text, imgSrc) => (
    <ListItem sx={{ justifyContent: 'flex-start' }}>
      <Box display={'flex'} alignItems={'end'} gap={1}>
        <Box
          sx={{
            minWidth: 36,
            height: 36,
            borderRadius: 50,
            overflow: 'hidden',
          }}
        >
          <Image src={imgSrc} width={36} height={36} alt="profile" />
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

  const outGoingMsg = (text, imgSrc) => (
    <ListItem sx={{ justifyContent: 'flex-end' }}>
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
          <Image src={imgSrc} width={36} height={36} alt="profile" />
        </Box>
      </Box>
    </ListItem>
  );

  return (
    <Grid
      container
      direction={'column'}
      boxShadow={'0 2px 4px rgba(15,34,58,.12)'}
      bgcolor={'lightBg.dark'}
      height={'100vh'}
    >
      <Grid
        p={2}
        item
        display={'flex'}
        alignItems={'center'}
        gap={2}
        marginBottom={1}
        paddingBottom={2}
        borderBottom={1}
        borderColor={'lightBg.main'}
      >
        <Box
          sx={{
            minWidth: 50,
            height: 50,
            borderRadius: 50,
            overflow: 'hidden',
          }}
        >
          <Image src={selectedChat.img} width={50} height={50} alt="profile" />
        </Box>
        <Typography fontWeight={'bold'} component={'h5'}>
          {selectedChat.name}
        </Typography>
      </Grid>

      <Grid item xs style={{ flexGrow: 1, overflow: 'auto' }} p={2} pt={0}>
        <List>
          {incomingMsg(
            'some random text',
            'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          )}
          {outGoingMsg(
            'some random text',
            'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          )}
        </List>
      </Grid>

      <Grid
        item
        py={2}
        px={3}
        borderTop={1}
        borderColor={'lightBg.main'}
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
        gap={2}
      >
        <TextField
          InputProps={{ disableUnderline: true }}
          fullWidth
          id="filled-basic"
          sx={{
            backgroundColor: 'lightBg.main',
            paddingX: 2,
            paddingY: 1,
            borderRadius: 1,
          }}
          placeholder="Search users"
          variant="standard"
        />
        <IconButton
          sx={{
            padding: 1.5,
            backgroundColor: 'lightBg.indigo',
            color: 'white',
            borderRadius: 1.5,
            '&:hover': {
              backgroundColor: 'lightBg.indigo',
            },
          }}
        >
          <Send />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
