import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getallUsers } from "../../redux/GetAllUsers";
import { useDispatch, useSelector } from "react-redux";

import { RemoveThisTokenSuccess } from "../../redux/TokenHandle";
import { RemoveLoggedInUserDetailSuccess } from "../../redux/UserLoggedInDetails";
import { toast } from "react-toastify";
import { getunverified } from "../../redux/GetUnverifiedBlogs";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const [collapse, setCollapse] = useState(false);
  const [getdata, setGetdata] = useState(false);
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const refreshPage = () => {
    localStorage.removeItem("MoruToken");
    dispatch(RemoveThisTokenSuccess());
    dispatch(RemoveLoggedInUserDetailSuccess());
    localStorage.removeItem("LoginUser");
    toast.success("Logged out");
    // window.location.reload();
  };
  const getDatas = () => {
    setGetdata(!getdata);
  };

  useEffect(() => {
    dispatch(getunverified(token));
    dispatch(getallUsers());
  }, [getdata]);

  return (
    <Layout hasSider>
      <>
        <Sider
          collapsible
          collapsed={collapse}
          onCollapse={() => setCollapse(!collapse)}
          style={{
            height: "100vh",
            position: "fixed",
          }}
        >
          <div className="dashboard-logo" style={{ marginTop: "10px" }}>
            <Link to="/dashboard">
              <img
                // src="images/moru.jpg"
                src="http://res.cloudinary.com/dpnxzofqd/image/upload/v1655885402/Moru-preset/paiqyssfbpizi8drdjsq.png "
                alt="logo"
                style={{ height: "37px" }}
                onClick={() => getDatas()}
              ></img>
            </Link>
          </div>
          <Menu
            mode="inline"
            theme="dark"
            // defaultSelectedKeys={["1"]}
            //   defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              marginTop: "11px",
            }}
          >
            <Menu.Item key="1">
              <Link to="blog-details">
                <FileOutlined />
                <span>Blog Details</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="add-blogs">
                <DesktopOutlined />
                <span>Add Blogs</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="verify-blogs">
                <CalendarOutlined />
                <span>Verify Blogs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="allusers">
                <UserOutlined />
                <span>User Details</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="allusers">
                <FileOutlined />
                <span>Ticket list</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="allusers">
                <CalendarOutlined />

                <span>Statics</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="allusers">
                <FileOutlined />
                <span>Trafics analytics</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="allusers">
                <CalendarOutlined />
                <span>Logs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="allusers">
                <UserOutlined />
                <span>CSR</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/" onClick={() => refreshPage()}>
                <LogoutOutlined />
                <span>Log Out</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            transition: "all 0.4s ease",
            marginLeft: collapse ? 80 : 200,
          }}
        >
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </>
    </Layout>
  );
};

export default Dashboard;
