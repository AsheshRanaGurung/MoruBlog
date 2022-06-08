import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: [],
  blogvote: 0,
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
export const { GetThisBlogSuccess, GetThisBlogVote, RemoveThisBlogVote } =
  GetThisBlog.actions;

export default GetThisBlog.reducer;
