import { createSlice } from "@reduxjs/toolkit";

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
    deleteThisBlog: (state, action) => {
      console.log(action.payload);
      state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    },
    // GetThisBlog: (state, action) => {
    //   console.log(action.payload);
    //   state.blogs = state.blogs.filter((item) => item.id !== action.payload);
    // },
  },
});

// Action creators are generated for each case reducer function
export const { getApiDataSuccess, deleteThisBlog } = GetApiData.actions;

export default GetApiData.reducer;
