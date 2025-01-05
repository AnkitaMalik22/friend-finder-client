import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: localStorage.getItem("token"),
  },
  withCredentials: true,
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    //   if (error.response?.status === 401) {
    //     localStorage.removeItem('token');
    //     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    //     window.location.href = '/login';
    //   }
    console.log("error", error);
    return Promise.reject(error?.response?.data?.message || error);
  }
);

// Auth endpoints
export const authEndpoints = {
  getAllUsers: () => api.get("/auth/users"),
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
};

// Friend endpoints
export const friendEndpoints = {
  searchUsers: (query) => api.get(`/friends/search?query=${query}`),
  getAllFriends: () => api.get("/friends/list"),
  sendRequest: (userId) => api.post(`/friends/request/send/${userId}`),
  acceptRequest: (requestId) => api.put(`/friends/request/accept/${requestId}`),
  rejectRequest: (requestId) => api.put(`/friends/request/reject/${requestId}`),
  getPendingRequests: () => api.get("/friends/request/pending"),
  getSentRequests: () => api.get("/friends/request/sent"),
  getRecommendations: () => api.get("/friends/recommendations"),
  removeFriend: (friendId) => api.delete(`/friends/remove/${friendId}`),
};

export default api;
