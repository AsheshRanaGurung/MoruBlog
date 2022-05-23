import { configureStore } from "@reduxjs/toolkit";
import CreateBlog from "./CreateBlog";
import GetApiData from "./GetApiData";
import GetThisBlog from "./GetThisBlog";
import GetThisToken from "./TokenHandle";

export const store = configureStore({
  reducer: {
    Blogs: GetApiData,
    createBlog: CreateBlog,
    getBlogdetail: GetThisBlog,

    getToken: GetThisToken,
  },
});
