import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Image from 'next/image';

const ChatCard = ({ item }) => {
  console.log(item);
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: 'none',
        boxShadow: 'none',
        background: 'transparent',
        borderRadius: 1,
      }}
    >
      <CardMedia
        sx={{ minWidth: 50, height: 50, borderRadius: 50, overflow: 'hidden' }}
      >
        <Image
          src={item.img}
          width={50}
          height={50}
          alt="Your image alt text"
        />
      </CardMedia>
      <CardContent sx={{ width: '100%' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="p" component="h4">
            {item.name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            component={'time'}
          >
            {item.timeStamp}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {item.lastMsg}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
