import { configureStore } from "@reduxjs/toolkit";
import CreateBlog from "./CreateBlog";
import GetApiData from "./GetApiData";
import GetThisBlog from "./GetThisBlog";
import GetThisToken from "./TokenHandle";
import GetLatestBlog from "./GetLatestBlog";
import GetLoggedInUserDetailSuccess from "./UserLoggedInDetails";
import GetUserDetailssuccess from "./GetAllUsers";
import GetUnverifiedBlog from "./GetUnverifiedBlogs";

export const store = configureStore({
  reducer: {
    Blogs: GetApiData,
    createBlog: CreateBlog,
    getBlogdetail: GetThisBlog,
    getLatestBLog: GetLatestBlog,
    getUnverifiedBlog: GetUnverifiedBlog,

    getToken: GetThisToken,
    getLoggedInUserDetail: GetLoggedInUserDetailSuccess,
    getUserDetails: GetUserDetailssuccess,
  },
});
