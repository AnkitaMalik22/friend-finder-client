import React from 'react';
import { 
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Typography, Paper, Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NoData from '../common/NoData';

const SentRequestsList = ({ requests }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Sent Requests</Typography>
      <List>
        {requests.map((request) => (
          <ListItem
            key={request._id}
            secondaryAction={
              <Chip
                icon={<AccessTimeIcon />}
                label="Pending"
                color="warning"
                variant="outlined"
                size="small"
              />
            }
          >
            <ListItemAvatar>
              <Avatar>{request.recipient.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={request.recipient.name}
              secondary={request.recipient.email}
            />
          </ListItem>
        ))}
      </List>
      {
        requests.length === 0 && (
          <NoData text="No sent requests found" />
        )
      }
    </Paper>
  );
};

export default SentRequestsList;