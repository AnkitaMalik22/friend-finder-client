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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { friendsApi } from '../utils/api';

const FriendRecommendations = () => {
  const queryClient = useQueryClient();
  const { data: recommendations, isLoading } = useQuery('recommendations', friendsApi.getRecommendations);

  const sendRequestMutation = useMutation(friendsApi.sendFriendRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('recommendations');
    },
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Friend Recommendations
      </Typography>
      <List>
        {recommendations?.data.map((user) => (
          <ListItem key={user.id}>
            <ListItemAvatar>
              <Avatar src={user.avatar}>{user.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={user.name} 
              secondary={
                <>
                  {user.email}
                  <br />
                  {user.mutualFriends} mutual friends
                  {user.commonInterests && ` • ${user.commonInterests} common interests`}
                </>
              } 
            />
            <Button
              startIcon={<PersonAddIcon />}
              onClick={() => sendRequestMutation.mutate(user.id)}
            >
              Add Friend
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendRecommendations;

