import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LeftMenu extends Component {
  render() {
    // const items = [
    //   { label: "Home" },
    //   {
    //     label: "Blog",
    //     children: [
    //       { label: "Hot News" },
    //       { label: "National news" },
    //       { label: "Business News" },
    //       { label: "International News" },
    //     ],
    //   },
    //   { label: "Create Blog" },
    //   {
    //     label: "About Moru",
    //     children: [{ label: "item 3" }, { label: "item 4" }],
    //   },
    // ];

    return (
      // <Menu mode="horizontal" items={items} style={{ fontSize: "19px" }} />
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <Link to="/" style={{ fontSize: "19px" }}>
            Home
          </Link>
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          title={<span>Blogs</span>}
          style={{ fontSize: "19px" }}
        >
          <MenuItemGroup title="Blog Category">
            <Menu.Item key="setting:1">Hot News </Menu.Item>
            <Menu.Item key="setting:2">National news </Menu.Item>
            <Menu.Item key="setting:3">Business News</Menu.Item>
            <Menu.Item key="setting:4">International News</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay2">
          <Link to="about" style={{ fontSize: "19px" }}>
            Create Blog
          </Link>
        </Menu.Item>
        <SubMenu
          key="SubMenu2"
          title={<span>About Us</span>}
          style={{ fontSize: "19px" }}
        >
          <MenuItemGroup>
            <Link to="/companyprofile" style={{ color: "black" }}>
              <Menu.Item key="settings:1">Company Profile</Menu.Item>
            </Link>
            <Link to="/team">
              <Menu.Item key="settings:2" style={{ color: "black" }}>
                Team{" "}
              </Menu.Item>
            </Link>
            <Link to="/mantra">
              <Menu.Item key="settings:4" style={{ color: "black" }}>
                Mantra
              </Menu.Item>
            </Link>
            <Link to="/objectives">
              <Menu.Item key="settings:3" style={{ color: "black" }}>
                Strategic Objectives
              </Menu.Item>
            </Link>
            <Link to="/ourgovernance">
              <Menu.Item key="settings:5" style={{ color: "black" }}>
                Corporate Governance
              </Menu.Item>
            </Link>
            <Link to="/committee">
              <Menu.Item key="settings:6" style={{ color: "black" }}>
                Committees formed by Board
              </Menu.Item>
            </Link>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}
export default LeftMenu;
