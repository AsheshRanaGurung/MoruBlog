import { createSlice } from "@reduxjs/toolkit";

const userLoginInfoFromLS = localStorage.getItem("LoginUser")
  ? JSON.parse(localStorage.getItem("LoginUser"))
  : null;

const initialState = {
  loggedinuserDetail: userLoginInfoFromLS,
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
    RemoveLoggedInUserDetailSuccess: (state, action) => {
      state.loggedinuserDetail = [];
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetLoggedInUserDetailSuccess, RemoveLoggedInUserDetailSuccess } =
  GetLoggedInUserDetail.actions;

export default GetLoggedInUserDetail.reducer;
