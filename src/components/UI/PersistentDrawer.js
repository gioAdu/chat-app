import { Box, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProfileCard from './Cards/ProfileCard';

const PersistentDrawer = ({ open, displayName, email, handleClose, drawerWidth ,}) => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <IconButton onClick={() => handleClose()} sx={{ width: 'fit-content', padding: 2 }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{padding:2}}>
        <ProfileCard firstName={displayName} email={email} />
      </Box>
    </Drawer>
  );
};

export default PersistentDrawer;
