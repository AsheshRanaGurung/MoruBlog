import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  isLoading: true,
  isSuccess: false,
};

export const GetLatestBlog = createSlice({
  name: "getLatestData",
  initialState,
  reducers: {
    getLatestDataSuccess: (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getLatestDataSuccess } = GetLatestBlog.actions;

export default GetLatestBlog.reducer;
