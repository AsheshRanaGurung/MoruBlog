import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import About from "../pages/AddBlog";
import AddEditpage from "../pages/AddEditpage";
import Blog from "../pages/Blog";
import CommitteePage from "../pages/CommitteePage";
import CompanyProfile from "../pages/CompanyProfile";
import Governance from "../pages/Governance";
import Login from "../pages/Login";
import Mantra from "../pages/Mantra";
import NotFoundPage from "../pages/NotFoundPage";
import ProfileScreen from "../pages/ProfileScreen";
import StrategyPage from "../pages/StrategyPage";
import Team from "../pages/Team";
import BlogDetails from "./dashboard/BlogDetails";
import Dashboard from "./dashboard/Dashboard";
import DashboardEditForm from "./dashboard/DashboardEditForm";
import DashboardForm from "./dashboard/DashboardForm";
import DashboardLandingPage from "./dashboard/DashboardLandingPage";
import GetAllUser from "./dashboard/GetAllUser";
import VerifyBlogs from "./dashboard/VerifyBlogs";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Register from "../pages/Register";

export default function MembersRoute() {
  const adminUser = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail?.is_admin
  );
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute adminUser={adminUser}>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <PrivateRoute adminUser={adminUser}>
              <DashboardLandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="add-blogs"
          element={
            <PrivateRoute adminUser={adminUser}>
              <DashboardForm />
            </PrivateRoute>
          }
        />
        <Route
          path="blog-details"
          element={
            <PrivateRoute adminUser={adminUser}>
              <BlogDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="verify-blogs"
          element={
            <PrivateRoute adminUser={adminUser}>
              <VerifyBlogs />
            </PrivateRoute>
          }
        />
        <Route
          path="allusers"
          element={
            <PrivateRoute adminUser={adminUser}>
              <GetAllUser />
            </PrivateRoute>
          }
        />
        <Route
          path="blog-details/edit-blog/:id"
          element={
            <PrivateRoute adminUser={adminUser}>
              <DashboardEditForm />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="/editblog/:id" element={<AddEditpage />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/addblog" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profilepage" element={<ProfileScreen />} />
      <Route path="/register" element={<Register />} />
      <Route path="/companyprofile" element={<CompanyProfile />} />
      <Route path="/team" element={<Team />} />
      <Route path="/mantra" element={<Mantra />} />
      <Route path="/objectives" element={<StrategyPage />} />
      <Route path="/ourgovernance" element={<Governance />} />
      <Route path="/committee" element={<CommitteePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
