import {createSlice} from '@reduxjs/toolkit';
import {fetchImages} from '../operations';
import {FeedState} from './types';

const initialState: FeedState = {
  images: [],
  loading: false,
  refreshing: false,
  page: 1,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetFeed: state => {
      state.images = [];
      state.page = 1;
    },
    setRefreshing: (state, action) => {
      state.refreshing = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchImages.pending, state => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images.push(...action.payload);
      })
      .addCase(fetchImages.rejected, state => {
        state.loading = false;
      });
  },
});

export const {resetFeed, setRefreshing} = feedSlice.actions;

export default feedSlice.reducer;
