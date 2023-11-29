import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Image from 'next/image';

const SearchCard = ({ item }) => {
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
          src={item.img || '/default_profile.png'}
          width={50}
          height={50}
          priority
          alt="profile"
        />
      </CardMedia>
      <CardContent sx={{ width: '100%' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="p" component="h4">
            {item.displayName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
