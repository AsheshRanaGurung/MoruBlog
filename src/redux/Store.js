import { configureStore } from "@reduxjs/toolkit";
import CreateBlog from "./CreateBlog";
import GetApiData from "./GetApiData";
import GetThisBlog from "./GetThisBlog";
import GetThisToken from "./TokenHandle";
import GetLatestBlog from "./GetLatestBlog";
import GetLoggedInUserDetailSuccess from "./UserLoggedInDetails";
import GetUserDetailssuccess from "./GetAllUsers";
import GetUnverifiedBlog from "./GetUnverifiedBlogs";
// // import GetThisBlogVote from "./GetThisBlog";
// import { taskApi } from "./GetAllUsers";

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

// // import { configureStore } from "@reduxjs/toolkit";
// // import { taskApi } from "./services/taskApi";
// export const store2 = configureStore({
//   reducer: {
//     // [taskApi.reducerPath]: taskApi.reducer,
//     [taskApi.reducerPath]: taskApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(taskApi.middleware),
// });
