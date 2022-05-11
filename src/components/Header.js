import React, { useEffect, useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Menu } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RemoveThisTokenSuccess } from "../redux/TokenHandle";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Header = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.getToken.token);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logOut = () => {
    onClose();
    localStorage.removeItem("MoruToken");
    dispatch(RemoveThisTokenSuccess());
    toast.success("Logged out Sccessfully!");
  };

  useEffect(() => {}, [userInfo]);
  return (
    <nav className="menuBar">
      <div className="Webcontainer">
        <div className="logo">
          {/* <img
            src="images/moru.jpg"
            alt="logo"
            style={{ height: "37px" }}
          ></img> */}
          <Link to="/" style={{ padding: "0px" }}>
            <img
              src="images/moru.jpg"
              alt="logo"
              style={{ height: "37px" }}
            ></img>
          </Link>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
          <button
            className="barsMenu"
            type="primary"
            // style={{ display: "none" }}
            onClick={showDrawer}
          >
            <span className="barsBtn"></span>
          </button>
          <Drawer
            title="Basic Drawer"
            placement="top"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Menu>
              <Menu.Item key="mail">
                <Link to="/" style={{ fontSize: "19px" }} onClick={onClose}>
                  Home
                </Link>
              </Menu.Item>
              <SubMenu
                key="SubMenu"
                title={<span>Blogs</span>}
                style={{ fontSize: "19px" }}
              >
                <MenuItemGroup title="Blog Category">
                  <Menu.Item key="setting:1" onClick={onClose}>
                    Hot News{" "}
                  </Menu.Item>
                  <Menu.Item key="setting:2" onClick={onClose}>
                    National news{" "}
                  </Menu.Item>
                  <Menu.Item key="setting:3" onClick={onClose}>
                    Business News
                  </Menu.Item>
                  <Menu.Item key="setting:4" onClick={onClose}>
                    International News
                  </Menu.Item>
                </MenuItemGroup>
              </SubMenu>

              {userInfo && (
                <Menu.Item key="alipay2">
                  <Link
                    to="/addblog"
                    style={{ fontSize: "19px" }}
                    onClick={onClose}
                  >
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
                  <Link
                    to="/companyprofile"
                    style={{ color: "black" }}
                    onClick={onClose}
                  >
                    <Menu.Item key="settings:1">Company Profile</Menu.Item>
                  </Link>
                  <Link to="/team">
                    <Menu.Item
                      key="settings:2"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Team{" "}
                    </Menu.Item>
                  </Link>
                  <Link to="/mantra">
                    <Menu.Item
                      key="settings:4"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Mantra
                    </Menu.Item>
                  </Link>
                  <Link to="/objectives">
                    <Menu.Item
                      key="settings:3"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Strategic Objectives
                    </Menu.Item>
                  </Link>
                  <Link to="/ourgovernance">
                    <Menu.Item
                      key="settings:5"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Corporate Governance
                    </Menu.Item>
                  </Link>
                  <Link to="/committee">
                    <Menu.Item
                      key="settings:6"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Committees formed by Board
                    </Menu.Item>
                  </Link>
                </MenuItemGroup>
              </SubMenu>

              {userInfo ? (
                <SubMenu
                  key="SubMenu3"
                  title={<span>Profile</span>}
                  style={{ fontSize: "19px" }}
                >
                  <MenuItemGroup>
                    <Menu.Item key="setting:1">
                      <Link to="/profilepage" onClick={onClose}>
                        Profile page
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2" onClick={() => logOut()}>
                      Log Out
                    </Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              ) : (
                <Menu.Item key="mail2">
                  <Link
                    to="/login"
                    style={{ fontSize: "19px" }}
                    onClick={onClose}
                  >
                    {/* <UserAddOutlined style={{ fontSize: "18px" }} /> */}
                    SignIn
                  </Link>
                </Menu.Item>
              )}
            </Menu>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};
export default Header;
