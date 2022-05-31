import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = () => {
  const userInfo = useSelector((state) => state.getToken.token);

  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <Link to="/" style={{ fontSize: "19px" }}>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="load">
        <a href="https://moru.com.np/" style={{ fontSize: "19px" }}>
          Load Fund
        </a>
      </Menu.Item>

      {userInfo && (
        <Menu.Item key="alipay2">
          <Link to="/addblog" style={{ fontSize: "19px" }}>
            Create Blog
          </Link>
        </Menu.Item>
      )}
      <SubMenu
        key="SubMenu2"
        title={<span>About Us</span>}
        style={{ fontSize: "19px" }}
      >
        <MenuItemGroup>
          <Link to="/companyprofile" style={{ color: "black" }}>
            <Menu.Item key="settings:5">Company Profile</Menu.Item>
          </Link>

          <Link to="/mantra">
            <Menu.Item key="settings:7" style={{ color: "black" }}>
              Mantra
            </Menu.Item>
          </Link>
          <Link to="/objectives">
            <Menu.Item key="settings:8" style={{ color: "black" }}>
              Strategic Objectives
            </Menu.Item>
          </Link>
          <Link to="/ourgovernance">
            <Menu.Item key="settings:9" style={{ color: "black" }}>
              Corporate Governance
            </Menu.Item>
          </Link>
          <Link to="/committee">
            <Menu.Item key="settings:10" style={{ color: "black" }}>
              Committees formed by Board
            </Menu.Item>
          </Link>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
};
export default LeftMenu;
