import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  isLoading: true,
  isSuccess: false,
  error: null,
};

export const GetUnverifiedBlogs = createSlice({
  name: "getUnverifiedBlogs",
  initialState,
  reducers: {
    GetUnverifiedBlogSuccess: (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    GetUnverifiedBlogFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    },
    deleteThisBlog: (state, action) => {
      console.log(action.payload);
      state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  GetUnverifiedBlogSuccess,
  GetUnverifiedBlogFail,
  deleteThisBlog,
} = GetUnverifiedBlogs.actions;

export default GetUnverifiedBlogs.reducer;

export function getunverified(token) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          access_token: token,
        },
      };

      const response = await axios.get(
        "https://flaskapi-sanjeev.herokuapp.com/posts/review",
        config
      );

      dispatch(GetUnverifiedBlogSuccess(response.data.posts));
    } catch (error) {
      dispatch(GetUnverifiedBlogFail());
    }
  };
}
