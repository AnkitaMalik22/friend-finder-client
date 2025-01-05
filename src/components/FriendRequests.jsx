import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { friendsApi } from '../utils/api';

const FriendRequests = () => {
  const queryClient = useQueryClient();
  const { data: pendingRequests, isLoading } = useQuery('pendingRequests', friendsApi.getPendingRequests);

  const acceptRequestMutation = useMutation(friendsApi.acceptFriendRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('pendingRequests');
      queryClient.invalidateQueries('friends');
    },
  });

  const rejectRequestMutation = useMutation(friendsApi.rejectFriendRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('pendingRequests');
    },
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Pending Friend Requests
      </Typography>
      <List>
        {pendingRequests?.data.map((request) => (
          <ListItem key={request.id}>
            <ListItemAvatar>
              <Avatar src={request.sender.avatar}>{request.sender.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={request.sender.name} secondary={request.sender.email} />
            <Button
              startIcon={<CheckIcon />}
              onClick={() => acceptRequestMutation.mutate(request.id)}
              color="primary"
            >
              Accept
            </Button>
            <Button
              startIcon={<CloseIcon />}
              onClick={() => rejectRequestMutation.mutate(request.id)}
              color="error"
            >
              Reject
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendRequests;

