import React from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '../common/LoadingButton';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, IconButton, Typography
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import NoData from '../common/NoData';

const FriendsList = ({ friends, onUnfriend }) => {

  const { loadingStates } = useSelector(state => state.friends);

  return (
    <>
      <Typography variant="h6" gutterBottom>Friends</Typography>
      <List>
        {friends.map((friend) => (
          <ListItem
            key={friend._id}
            secondaryAction={
             <LoadingButton
            onClick={() => onUnfriend(friend._id)}
            loading={ friend._id === loadingStates.REMOVE_FRIEND_LOADING }
            color="error"
          >
            Remove
          </LoadingButton>
            }
          >
            <ListItemAvatar>
              <Avatar>{friend.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={friend.name}
              secondary={friend.email}
            />
          </ListItem>
        ))}
      </List>
      {
        friends?.length === 0 && (
         <NoData message="No friends found" />
        )
      }
    </>
  );
};

export default FriendsList;