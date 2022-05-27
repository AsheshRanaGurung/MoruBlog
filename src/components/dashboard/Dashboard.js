import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import DashboardForm from "./DashboardForm";
import BlogDetails from "./BlogDetails";
import { Link, Router } from "react-router-dom";

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items2 = [
  //   getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Blogs Details", "1", <FileOutlined />),
  getItem("Add Blog", "2", <DesktopOutlined />),

  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
];

const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const Dashboard = () => {
  const [collapse, setCollapse] = useState(false);
  // const location = useLocation();
  return (
    <Layout hasSider>
      <>
        <Header
          className="header"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="logo">
            {" "}
            <img
              src="images/moru.jpg"
              alt="logo"
              style={{ height: "37px" }}
            ></img>
          </div>
        </Header>
        <Sider
          collapsible
          collapsed={collapse}
          onCollapse={() => setCollapse(!collapse)}
          style={{
            height: "100vh",
            position: "fixed",
          }}
        >
          <div className="logo" />
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            //   defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              marginTop: "70px",
            }}
          >
            <Menu.Item key="1">
              {/* <Link to={`${location?.pathname}/blog-details`}> */}
              <FileOutlined />
              <span>Blog Details</span>
              {/* </Link> */}
            </Menu.Item>

            <Menu.Item key="2">
              {/* <Link to={`${location?.pathname}/add-blogs`}> */}
              <DesktopOutlined />
              <span>Add Blogs</span>
              {/* </Link> */}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: collapse ? 80 : 200 }}
        >
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              {/* <Routes>
                <Route
                  path={`${location?.pathname}/add-blogs`}
                  element={<DashboardForm />}
                />
                <Route
                  path={`${location?.pathname}/blog-details`}
                  element={<BlogDetails />}
                />
              </Routes> */}
              {/* {JSON.stringify(location.pathname)} */}

              <DashboardForm />
              <BlogDetails />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </>
    </Layout>

    // </div>
  );
};

export default Dashboard;
