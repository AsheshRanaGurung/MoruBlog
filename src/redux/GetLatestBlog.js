import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
    getLatestDataFail: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getLatestDataSuccess, getLatestDataFail } =
  GetLatestBlog.actions;

export default GetLatestBlog.reducer;

export function fetchLatestBlog() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://flaskapi-sanjeev.herokuapp.com/posts`
      );
      dispatch(getLatestDataSuccess(response?.data?.posts));
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
}
