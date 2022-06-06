import { createSlice } from "@reduxjs/toolkit";

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
    deleteThisUser: (state, action) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
      // state.isSuccess = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetUserDetailssuccess, deleteThisUser } = GetUserDetails.actions;

export default GetUserDetails.reducer;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const taskApi = createApi({
//   reducerPath: "tasksApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://flaskapi-sanjeev.herokuapp.com/",
//   }),
//   endpoints: (builder) => ({
//     tasks: builder.query({
//       query: () => "/account",
//     }),
//     addTask:(builder)=>({

//     })
//   }),
// });
// export const { useTasksQuery } = taskApi;
