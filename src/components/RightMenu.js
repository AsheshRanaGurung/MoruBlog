import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

class RightMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail2">
          <Link to="/login" style={{ fontSize: "19px" }}>
            {/* <UserAddOutlined style={{ fontSize: "18px" }} /> */}
            SignIn
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register" style={{ fontSize: "19px" }}>
            Signup
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default RightMenu;
