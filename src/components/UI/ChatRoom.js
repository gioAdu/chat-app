import { Send } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { auth } from '../firebase/config';
import { useQuery } from '@tanstack/react-query';
import { getchatHistory } from '../API/api';
import { chatMessages } from './ChatMessageComponents';

const ChatRoom = () => {
  const currentUser = auth.currentUser;

  const {
    data: chatHistory,
    isLoading,
    error,
  } = useQuery({ queryKey: ['chatHistory'], queryFn: getchatHistory });
  
  if (isLoading) {
    return (
      <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
      >
        <CircularProgress color="secondary" size={80} />
      </Grid>
    );
  }
  
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
          <Image
            src={'/default_profile.png'}
            width={50}
            height={50}
            alt="profile"
          />
        </Box>
        <Typography fontWeight={'bold'} component={'h5'}>
          User
        </Typography>
      </Grid>

      <Grid item xs style={{ flexGrow: 1, overflow: 'auto' }} p={2} pt={0}>
        <List>{chatMessages(chatHistory)}</List>
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
