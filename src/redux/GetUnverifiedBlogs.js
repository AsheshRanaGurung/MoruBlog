import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  isLoading: true,
  isSuccess: false,
};

export const GetUnverifiedBlogs = createSlice({
  name: "getUnverifiedBlogs",
  initialState,
  reducers: {
    GetUnverifiedBlog: (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    deleteThisBlog: (state, action) => {
      console.log(action.payload);
      state.blogs = state.blogs.filter((item) => item.id !== action.payload);
      // state.isSuccess = true;
    },
    // GetThisBlog: (state, action) => {
    //   console.log(action.payload);
    //   state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    // },
  },
});

// Action creators are generated for each case reducer function
export const { GetUnverifiedBlog, deleteThisBlog } = GetUnverifiedBlogs.actions;

export default GetUnverifiedBlogs.reducer;
