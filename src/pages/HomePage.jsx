import React, { use, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Paper } from "@mui/material";
import SearchBar from "../components/home/SearchBar";
import UsersList from "../components/home/UsersList";
import FriendsList from "../components/home/FriendsList";
import RequestsList from "../components/home/RequestsList";
import { friendEndpoints } from "../services/api";
import {
  getAllUsers,
  searchUsers,
  removeFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  getPendingRequests,
  getFriends,
} from "../features/friends/friendsSlice";
import { checkAuth } from "../features/auth/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { users, loadingStates } = useSelector((state) => state.friends);

  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getAllUsers());
  }, []);

  const refreshData = useCallback(() => {
    dispatch(getAllUsers());
    dispatch(getPendingRequests());
    dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleSearch = (query) => {
    dispatch(searchUsers(query));
  };

  const handleAcceptRequest = async (requestId) => {
    await dispatch(acceptFriendRequest(requestId));
    refreshData();
  };

  const handleRejectRequest = async (requestId) => {
    await dispatch(rejectFriendRequest(requestId));
    refreshData();
  };

  const handleRemoveFriend = async (friendId) => {
    await dispatch(removeFriend(friendId));
    refreshData();
  };

  const handleSendRequest = async (userId) => {
    await dispatch(sendFriendRequest(userId));
    refreshData();
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [friendsRes, requestsRes] = await Promise.all([
          friendEndpoints.getAllFriends(),
          friendEndpoints.getPendingRequests(),
        ]);
        setFriends(friendsRes.data.data);
        setRequests(requestsRes.data.data);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };
    loadInitialData();
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar onSearch={handleSearch} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <UsersList
              users={users}
              friends={friends}
              onSendRequest={handleSendRequest}
              loading={loadingStates.SEND_REQUEST_LOADING}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <RequestsList
              requests={requests}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
              loading={loadingStates.ACCEPT_REQUEST_LOADING || loadingStates.REJECT_REQUEST_LOADING}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <FriendsList
              friends={friends}
              onUnfriend={handleRemoveFriend}
              loading={loadingStates.REMOVE_FRIEND_LOADING}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
