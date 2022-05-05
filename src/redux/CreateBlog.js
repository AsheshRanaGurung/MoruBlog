import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
  isLoading: true,
  //   isSuccess: false,
};

export const CreateBlog = createSlice({
  name: "createBlog",
  initialState,
  reducers: {
    createNewBlog: (state, action) => {
      state.blog = action.payload;
      state.isLoading = false;
      state.isSuccess = Math.random();
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
export const { createNewBlog, decrement, incrementByAmount } =
  CreateBlog.actions;

export default CreateBlog.reducer;