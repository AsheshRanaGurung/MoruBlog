import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import AddEditpage from "./pages/AddEditpage";
import Blogs from "./components/Blogs";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import About from "./pages/About";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Header from "./components/Header";
import "antd/dist/antd.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompanyProfile from "./pages/CompanyProfile";
import Team from "./pages/Team";
import Mantra from "./pages/Mantra";
import StrategyPage from "./pages/StrategyPage";
import Governance from "./pages/Governance";
import CommitteePage from "./pages/CommitteePage";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import axios from "axios";

// import { Layout } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getApiDataSuccess } from "./redux/GetApiData";
import Blog from "./pages/Blog";
import ProfileScreen from "./pages/ProfileScreen";
// import { loadBlogsData } from "./service";

function App() {
  const getData = useSelector((state) => state.createBlog);
  const { isSuccess } = getData;
  // const userInfo = useSelector((state) => state.getToken.token);
  const pathname = window.location.pathname;

  const dispatch = useDispatch();

  useEffect(() => {
    loadBlogsData();
  }, [isSuccess]);

  const loadBlogsData = async () => {
    // const response = await axios.get("http://localhost:5000/blogs");
    // console.log("response1", response.data);
    // dispatch(getApiDataSuccess(response.data));

    const response2 = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/posts"
    );
    console.log("response2", response2?.data?.posts);
    dispatch(getApiDataSuccess(response2?.data?.posts));
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* {JSON.stringify(isSuccess)} */}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
        />
        {pathname === "/dashboard" ? (
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/addBlog" element={<AddEditpage />} /> */}
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
            <Footer />
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
