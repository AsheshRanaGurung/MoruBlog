import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  isLoading: true,
  isSuccess: false,
};

export const GetApiData = createSlice({
  name: "getApiData",
  initialState,
  reducers: {
    getApiDataSuccess: (state, action) => {
      state.blogs = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    getApiDataFail: (state, action) => {
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
export const { getApiDataSuccess, getApiDataFail, deleteThisBlog } =
  GetApiData.actions;

export default GetApiData.reducer;

export function loadBlogsData() {
  return async (dispatch) => {
    try {
      const response2 = await axios.get(
        "https://flaskapi-sanjeev.herokuapp.com/posts"
      );
      dispatch(getApiDataSuccess(response2?.data?.posts));
    } catch (error) {
      dispatch(getApiDataFail());
    }
  };
}
