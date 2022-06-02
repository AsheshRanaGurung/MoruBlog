import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedinuserDetail: [],
  isLoading: true,
  isSuccess: false,
};

export const GetLoggedInUserDetail = createSlice({
  name: "GetLoggedInUserDetail",
  initialState,
  reducers: {
    GetLoggedInUserDetailSuccess: (state, action) => {
      state.loggedinuserDetail = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetLoggedInUserDetailSuccess } = GetLoggedInUserDetail.actions;

export default GetLoggedInUserDetail.reducer;
