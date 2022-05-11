import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLS = localStorage.getItem("MoruToken")
  ? JSON.parse(localStorage.getItem("MoruToken"))
  : null;

const initialState = {
  token: userInfoFromLS,
  isLoading: true,
  isSuccess: false,
};

export const GetThisToken = createSlice({
  name: "GetThisToken",
  initialState,
  reducers: {
    GetThisTokenSuccess: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    RemoveThisTokenSuccess: (state, action) => {
      state.token = "";
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetThisTokenSuccess, RemoveThisTokenSuccess } =
  GetThisToken.actions;

export default GetThisToken.reducer;
