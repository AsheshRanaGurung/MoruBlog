import { configureStore } from "@reduxjs/toolkit";
import CreateBlog from "./CreateBlog";
import GetApiData from "./GetApiData";

export const store = configureStore({
  reducer: {
    Blogs: GetApiData,
    createBlog: CreateBlog,
  },
});
