import React from 'react';
import { useSelector } from 'react-redux';
import {
  List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Button, Typography, Stack
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import NoData from '../common/NoData';
import LoadingButton from '../common/LoadingButton';

const RequestsList = ({ requests, onAccept, onReject }) => {
  const { loadingStates } = useSelector(state => state.friends);

  return (
    <>
      <Typography variant="h6" gutterBottom>Requests</Typography>
      <List>
        {requests.map((request) => (
          <ListItem
            key={request._id}
            secondaryAction={
              <Stack direction="row" spacing={1}>
               <LoadingButton
            onClick={() => onAccept(request._id)}
            loading={request._id === loadingStates.ACCEPT_REQUEST_LOADING}
            color="success"
          >
            Accept
          </LoadingButton>
          <LoadingButton
            onClick={() => onReject(request._id)}
            loading={request._id === loadingStates.REJECT_REQUEST_LOADING}
            color="error"
          >
            Reject
          </LoadingButton>
              </Stack>
            }
          >
            <ListItemAvatar>
              <Avatar>{request.sender.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={request.sender.name}
              secondary={request.sender.email}
            />
          </ListItem>
        ))}
      </List>
      {
        requests.length === 0 && (
          <NoData text="No friend requests" />
        )
      }
    </>
  );
};

export default RequestsList;