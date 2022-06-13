import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Header from "./components/Header";
import "antd/dist/antd.css";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { loadBlogsData } from "./redux/GetApiData";
import MembersRoute from "./components/MemberRoute";

function App() {
  const getData = useSelector((state) => state.createBlog);
  const { isSuccess } = getData;
  const getunverifiedBlog = useSelector((state) => state.getUnverifiedBlog);
  const { isSuccess: newVerifiedBlog } = getunverifiedBlog;

  const adminUser = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail?.is_admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBlogsData());
  }, [isSuccess, newVerifiedBlog]);

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
        />
        {adminUser === true ? null : <Header />}
        <MembersRoute />
        {adminUser === true ? null : <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
