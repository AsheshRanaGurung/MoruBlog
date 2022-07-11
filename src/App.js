import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./components/Header";
import "antd/dist/antd.css";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { loadBlogsData } from "./redux/GetApiData";
import MembersRoute from "./components/MemberRoute";
import SecondaryHeader from "./components/SecondaryHeader";

function App() {
  const getData = useSelector((state) => state.createBlog);
  const { isSuccess } = getData;
  const getunverifiedBlog = useSelector((state) => state.getUnverifiedBlog);
  const { isSuccess: newVerifiedBlog } = getunverifiedBlog;
  const userInfo = useSelector((state) => state.getLoggedInUserDetail);
  const { loggedinuserDetail, isLoading } = userInfo;

  const adminUser = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail?.is_admin
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBlogsData());
  }, [isSuccess, newVerifiedBlog, dispatch]);

  useEffect(() => {
    if (loggedinuserDetail) {
      if (loggedinuserDetail?.is_admin === true) {
        navigate("/dashboard");
      }
    }
  }, [loggedinuserDetail]);
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
      {adminUser === true ? null : <SecondaryHeader />}
      {adminUser === true ? null : <Header />}
      <MembersRoute />

      {adminUser === true ? null : <Footer />}
    </div>
  );
}

export default App;
