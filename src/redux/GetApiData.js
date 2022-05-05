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
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiDataSuccess, decrement, incrementByAmount } =
  GetApiData.actions;

export default GetApiData.reducer;
