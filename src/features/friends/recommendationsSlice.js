import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { friendEndpoints } from '../../services/api';

export const fetchRecommendations = createAsyncThunk(
    'recommendations/fetch',
    async () => {
        const { data } = await friendEndpoints.getRecommendations();
        return data.data;
    }
);

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export default recommendationsSlice.reducer;