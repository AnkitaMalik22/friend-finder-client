import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const NoData = ({ type = 'default', message }) => {
  const icons = {
    search: <SearchOffIcon sx={{ fontSize: 60, color: 'text.secondary' }} />,
    friends: <PeopleOutlineIcon sx={{ fontSize: 60, color: 'text.secondary' }} />,
    requests: <MailOutlineIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
  };

  const messages = {
    search: 'No users found',
    friends: 'No friends yet',
    requests: 'No pending requests',
    default: 'No data available'
  };

  return (
    <Paper 
      elevation={0} 
      sx={{
        p: 3,
        textAlign: 'center',
        backgroundColor: 'transparent',
        border: '2px dashed',
        borderColor: 'divider'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        {icons[type] || icons.default}
        <Typography color="text.secondary" variant="h6">
          {message || messages[type] || messages.default}
        </Typography>
      </Box>
    </Paper>
  );
};

export default NoData;