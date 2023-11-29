import { auth } from '@/components/firebase/config';
import { Box, Typography } from '@mui/material';

const Profile = () => {
  const currentUser = auth.currentUser;
  return (
    <Box sx={{ paddingX: 3, backgroundColor: 'lightBg.light', height: '100dvh' }}>
      <Typography component={'h1'} variant="h5" sx={{ paddingY: 2 }}>
        My Profile
      </Typography>
    </Box>
  );
};

export default Profile;
