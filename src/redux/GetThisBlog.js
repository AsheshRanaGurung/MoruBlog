import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: [],
  isLoading: true,
  isSuccess: false,
};

export const GetThisBlog = createSlice({
  name: "GetThisBlog",
  initialState,
  reducers: {
    GetThisBlogSuccess: (state, action) => {
      state.blog = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetThisBlogSuccess } = GetThisBlog.actions;

export default GetThisBlog.reducer;
