import { configureStore } from "@reduxjs/toolkit";
import CreateBlog from "./CreateBlog";
import GetApiData from "./GetApiData";
import GetThisBlog from "./GetThisBlog";

export const store = configureStore({
  reducer: {
    Blogs: GetApiData,
    createBlog: CreateBlog,
    getBlogdetail: GetThisBlog,
  },
});
