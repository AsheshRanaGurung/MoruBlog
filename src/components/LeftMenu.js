import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LeftMenu = () => {
  const userInfo = useSelector((state) => state.getToken.token);
  const navigate = useNavigate();
  return (
    <Menu mode="horizontal" className="bgColor">
      <Menu.Item key="mail">
        <Link to="/" style={{ fontSize: "15px", padding: "10px 0px" }}>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="load">
        <a
          href="https://moru.com.np/"
          style={{ fontSize: "15px", padding: "10px 0px" }}
        >
          Load Fund
        </a>
      </Menu.Item>

      {userInfo && (
        <Menu.Item key="alipay2">
          <Link to="/addblog" style={{ fontSize: "15px", padding: "10px 0px" }}>
            Create Blog
          </Link>
        </Menu.Item>
      )}
      <SubMenu
        key="SubMenu4"
        title={<span>About Us</span>}
        style={{ fontSize: "15px" }}
      >
        <MenuItemGroup>
          <Menu.Item
            key="settings:5"
            onClick={() => navigate("/companyprofile")}
          >
            Company Profile
          </Menu.Item>
          <Menu.Item key="mantra" onClick={() => navigate("/mantra")}>
            Mantra
          </Menu.Item>

          <Menu.Item key="objective" onClick={() => navigate("/objectives")}>
            Strategic Objectives
          </Menu.Item>

          <Menu.Item
            key="governance"
            onClick={() => navigate("/ourgovernance")}
          >
            Corporate Governance
          </Menu.Item>

          <Menu.Item key="commitee" onClick={() => navigate("/committee")}>
            Committees formed by Board
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
};
export default LeftMenu;
