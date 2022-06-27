import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  isLoading: true,
  isSuccess: false,
};

export const GetUserDetails = createSlice({
  name: "getUserDetails",
  initialState,
  reducers: {
    GetUserDetailssuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    GetUserDetailsFail: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
    },
    deleteThisUser: (state, action) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
      // state.isSuccess = true;
    },
  },
});

export const { GetUserDetailssuccess, GetUserDetailsFail, deleteThisUser } =
  GetUserDetails.actions;

export default GetUserDetails.reducer;

export function getallUsers() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://flaskapi-sanjeev.herokuapp.com/users"
      );
      dispatch(GetUserDetailssuccess(response.data.users));
    } catch (error) {
      dispatch(GetUserDetailsFail());
    }
  };
}
