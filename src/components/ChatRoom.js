import { Box, CardMedia, Grid, Typography } from '@mui/material';
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
    return <div>loading ...</div>;
  }

  return (
    <Grid
      container
      direction={'column'}
      boxShadow={'0 2px 4px rgba(15,34,58,.12)'}
      p={2}
      bgcolor={'lightBg.dark'}
      height={'100vh'}
    >
      <Grid
        item
        display={'flex'}
        alignItems={'center'}
        gap={2}
        marginBottom={2}
        paddingBottom={2}
        borderBottom={1}
        borderColor={'lightBg.main'}
      >
        <Box
          sx={{
            width: 50,
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

      <Grid item xs style={{ flexGrow: 1 }}>
        Chat itself
      </Grid>

      <Grid item>input field</Grid>
    </Grid>
  );
};

export default ChatRoom;
