import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/" style={{ color: "black" }}>
            Home
          </Link>
        </Menu.Item>
        <SubMenu title={<span>Blogs</span>}>
          <MenuItemGroup title="Blog Category">
            <Menu.Item key="setting:1">Hot News </Menu.Item>
            <Menu.Item key="setting:2">National news </Menu.Item>
            <Menu.Item key="setting:3">Business News</Menu.Item>
            <Menu.Item key="setting:4">International News</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay2">
          <Link to="about" style={{ color: "black" }}>
            Create Blog
          </Link>
        </Menu.Item>
        <Menu.Item key="alipay">
          <Link to="about" style={{ color: "black" }}>
            About Moru
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
