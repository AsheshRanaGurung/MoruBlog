import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Header from "./components/Header";
import "antd/dist/antd.css";
import Footer from "./components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getApiDataSuccess } from "./redux/GetApiData";

import MembersRoute from "./components/MemberRoute";

function App() {
  const getData = useSelector((state) => state.createBlog);
  const { isSuccess } = getData;
  const adminUser = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail?.is_admin
  );
  const dispatch = useDispatch();

  useEffect(() => {
    loadBlogsData();
  }, [isSuccess]);

  const loadBlogsData = async () => {
    const response2 = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/posts"
    );

    dispatch(getApiDataSuccess(response2?.data?.posts));
  };

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
