import React from 'react';
import { 
  List, ListItem, ListItemAvatar, ListItemText, 
  Avatar, Button, Typography 
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NoData from '../common/NoData';

const UsersList = ({ users, friends, onSendRequest }) => {
  const isFriend = (userId) => friends.some(friend => friend._id === userId);

  return (
    <>
      <Typography variant="h6" gutterBottom>Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user._id}
            secondaryAction={
              !isFriend(user._id) && (
                <Button
                disabled={user?.requestSent}
                  startIcon={user?.requestSent ? null : <PersonAddIcon />}
                  onClick={() => user?.requestSent ? null : onSendRequest(user._id)}
                >
                 {user?.requestSent ? 'Request Sent' : 'Add Friend'}
                </Button>
              )
            }
          >
            <ListItemAvatar>
              <Avatar>{user.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={user.email}
            />
          </ListItem>
        ))}
        {
          users.length === 0 && (
            <NoData text="No users found" />
          )
        }
      </List>
    </>
  );
};

export default UsersList;