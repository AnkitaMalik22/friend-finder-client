import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RefreshIcon from '@mui/icons-material/Refresh';
import { friendEndpoints } from '../../services/api';

const RecommendationsList = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const { data } = await friendEndpoints.getRecommendations();
      setRecommendations(data.data);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, []);

  const handleSendRequest = async (userId) => {
    try {
      await friendEndpoints.sendRequest(userId);
      setRecommendations(recommendations.filter(rec => rec._id !== userId));
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Recommended Friends</Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={loadRecommendations}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>
      
      <List>
        {recommendations.map((user) => (
          <ListItem
            key={user._id}
            secondaryAction={
              <Button
                startIcon={<PersonAddIcon />}
                onClick={() => handleSendRequest(user._id)}
              >
                Add Friend
              </Button>
            }
          >
            <ListItemAvatar>
              <Avatar>{user.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <Stack direction="column" spacing={1}>
                  <Typography variant="body2">
                    {user.mutualFriendsCount} mutual friends
                  </Typography>
                  <Box>
                    {user.commonInterests?.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecommendationsList;