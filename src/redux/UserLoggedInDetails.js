import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { GetThisTokenSuccess } from "./TokenHandle";

const userLoginInfoFromLS = localStorage.getItem("LoginUser")
  ? JSON.parse(localStorage.getItem("LoginUser"))
  : null;

const initialState = {
  loggedinuserDetail: userLoginInfoFromLS,
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const GetLoggedInUserDetail = createSlice({
  name: "GetLoggedInUserDetail",
  initialState,
  reducers: {
    GetLoggedInUser: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    GetLoggedInUserDetailSuccess: (state, action) => {
      state.loggedinuserDetail = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    GetLoggedInUserDetailFail: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    },
    RemoveLoggedInUserDetailSuccess: (state, action) => {
      state.loggedinuserDetail = null;
      state.isLoading = false;
      state.isSuccess = true;
    },
    GetLoggedInUserUpdateSuccess: (state, action) => {
      let username = action.payload;

      state.loggedinuserDetail = {
        ...state.loggedinuserDetail,
        username: username,
      };
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  GetLoggedInUser,
  GetLoggedInUserDetailSuccess,
  GetLoggedInUserDetailFail,
  GetLoggedInUserUpdateSuccess,
  RemoveLoggedInUserDetailSuccess,
} = GetLoggedInUserDetail.actions;

export default GetLoggedInUserDetail.reducer;

export function login(username, password) {
  return async (dispatch) => {
    dispatch(GetLoggedInUser());
    var credentials = btoa(username + ":" + password);
    var basicAuth = "Basic " + credentials;
    const config = {
      // headers: { Authorization: basicAuth },
      // auth: {
      email: username,
      password: password,
      // },
    };
    await axios
      .post(
        "https://flaskapi-sanjeev.herokuapp.com/login",
        // {},
        config
      )
      .then((response) => {
        localStorage.setItem("MoruToken", JSON.stringify(response.data.token));
        localStorage.setItem("LoginUser", JSON.stringify(response.data.user));

        toast.success("Logged In Successfully");

        dispatch(GetThisTokenSuccess(response.data.token));
        dispatch(GetLoggedInUserDetailSuccess(response.data.user));
      })
      .catch((error) => {
        dispatch(GetLoggedInUserDetailFail(error.response.data.error));
        toast.error(error.response.data.error);
      });
  };
}
