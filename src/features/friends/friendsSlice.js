import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authEndpoints, friendEndpoints } from '../../services/api';
import toast from 'react-hot-toast';

// Async Thunks
export const searchUsers = createAsyncThunk(
  'friends/searchUsers',
  async (query) => {
    const { data } = await friendEndpoints.searchUsers(query);
    return data.data;
  }
);

export const getFriends = createAsyncThunk(
  'friends/getFriends',
  async () => {
    const { data } = await friendEndpoints.getAllFriends();
    return data.data;
  }
);

export const getPendingRequests = createAsyncThunk(
  'friends/getPendingRequests',
  async () => {
    const { data } = await friendEndpoints.getPendingRequests();
    return data.data;
  }
);

export const getSentRequests = createAsyncThunk(
  'friends/getSentRequests',
  async () => {
    const { data } = await friendEndpoints.getSentRequests();
    return data.data;
  }
);

export const sendFriendRequest = createAsyncThunk(
  'friends/sendRequest',
  async (userId) => {
    const { data } = await friendEndpoints.sendRequest(userId);
    return data.data;
  }
);

export const acceptFriendRequest = createAsyncThunk(
  'friends/acceptRequest',
  async (requestId) => {
    const { data } = await friendEndpoints.acceptRequest(requestId);
    return data.data;
  }
);
export const rejectFriendRequest = createAsyncThunk(
    'friends/rejectRequest',
    async (requestId) => {
        const { data } = await friendEndpoints.rejectRequest(requestId);
        return data.data;
    }
);

export const removeFriend = createAsyncThunk(
    'friends/removeFriend',
    async (friendId) => {
        const { data } = await friendEndpoints.removeFriend(friendId);
        return data.data;
    }
);



export const getAllUsers = createAsyncThunk(
    'auth/getAllUsers',
    async () => {
        console.log("getAllUsers");
        const { data } = await authEndpoints.getAllUsers();

        return data.data;
    }
    
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    searchResults: [],
    users: [],
    friends: [],
    pendingRequests: [],
    sentRequests: [],
    loadingStates: {
      SEARCH_LOADING: false,
      GET_USERS_LOADING: false,
      GET_FRIENDS_LOADING: false,
      SEND_REQUEST_LOADING: false,
      ACCEPT_REQUEST_LOADING: false,
      REJECT_REQUEST_LOADING: false,
      REMOVE_FRIEND_LOADING: false,
      GET_PENDING_REQUESTS_LOADING: false,
      GET_SENT_REQUESTS_LOADING: false
    },
    errors: {
      searchError: null,
      usersError: null,
      friendsError: null,
      requestError: null
    }
  },
  reducers: {
    clearErrors: (state) => {
      state.errors = {
        searchError: null,
        usersError: null,
        friendsError: null,
        requestError: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Search Users
      .addCase(searchUsers.pending, (state) => {
        state.loadingStates.SEARCH_LOADING = true;
        state.errors.searchError = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.users = action.payload;
        state.loadingStates.SEARCH_LOADING = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loadingStates.SEARCH_LOADING = false;
        state.errors.searchError = action.error.message;
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loadingStates.GET_USERS_LOADING = true;
        state.errors.usersError = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loadingStates.GET_USERS_LOADING = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loadingStates.GET_USERS_LOADING = false;
        state.errors.usersError = action.error.message;
      })

      // Get Friends
      .addCase(getFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
      })

      // Get Pending Requests
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.pendingRequests = action.payload;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        toast.error('Failed to load pending requests');
      })

      // Get Sent Requests
      .addCase(getSentRequests.fulfilled, (state, action) => {
        state.sentRequests = action.payload;
      })
      .addCase(getSentRequests.rejected, (state, action) => {
        toast.error('Failed to load sent requests');
      })

      // Send Friend Request
      .addCase(sendFriendRequest.pending, (state) => {
        state.loadingStates.SEND_REQUEST_LOADING = true;
        state.errors.requestError = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.sentRequests.push(action.payload);
        state.loadingStates.SEND_REQUEST_LOADING = false;
        toast.success('Friend request sent successfully');
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        console.log(action.error);
        state.loadingStates.SEND_REQUEST_LOADING = false;
        state.errors.requestError = action.error
        toast.error(action.error.message || 'Failed to send friend request');
      })

      // Accept Friend Request
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loadingStates.ACCEPT_REQUEST_LOADING = true;
        state.errors.requestError = null;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.pendingRequests = state.pendingRequests.filter(
          req => req._id !== action.payload._id
        );
        state.friends.push(action.payload.sender);
        state.loadingStates.ACCEPT_REQUEST_LOADING = false;
        toast.success('Friend request accepted');
        getFriends();
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loadingStates.ACCEPT_REQUEST_LOADING = false;
        state.errors.requestError = action.error.message;
        toast.error('Failed to accept friend request');
      })

      // Reject Friend Request
      .addCase(rejectFriendRequest.pending, (state) => {
        state.loadingStates.REJECT_REQUEST_LOADING = true;
        state.errors.requestError = null;
      })
      .addCase(rejectFriendRequest.fulfilled, (state, action) => {
        state.pendingRequests = state.pendingRequests.filter(
          req => req._id !== action.payload._id
        );
        state.loadingStates.REJECT_REQUEST_LOADING = false;
        toast.success('Friend request rejected');
      })
      .addCase(rejectFriendRequest.rejected, (state, action) => {
        state.loadingStates.REJECT_REQUEST_LOADING = false;
        state.errors.requestError = action.error.message;
        toast.error('Failed to reject friend request');
      });

    // Remove Friend
    builder.addCase(removeFriend.pending, (state) => {
      state.loadingStates.REMOVE_FRIEND_LOADING = true;
    });
    builder.addCase(removeFriend.fulfilled, (state, action) => {
      state.friends = state.friends.filter(
        friend => friend._id !== action.payload._id
      );
        toast.success('Friend removed');
        getFriends();
    });
    builder.addCase(removeFriend.rejected, (state, action) => {
      state.loadingStates.REMOVE_FRIEND_LOADING = false;
      toast.error('Failed to remove friend');
  });
}

});

export const { clearErrors } = friendsSlice.actions;
export default friendsSlice.reducer;