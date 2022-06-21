import React, { useEffect, useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RemoveThisTokenSuccess } from "../redux/TokenHandle";
import { RemoveLoggedInUserDetailSuccess } from "../redux/UserLoggedInDetails";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Header = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.getToken.token);

  const user = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail
  );

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const logOut = () => {
    onClose();
    toast.success("Logged out Successfully!");
    navigate("/");
    window.location.reload();
    localStorage.removeItem("MoruToken");
    dispatch(RemoveThisTokenSuccess());
    dispatch(RemoveLoggedInUserDetailSuccess());
    localStorage.removeItem("LoginUser");
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
            title="Moru Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Menu>
              <Menu.Item key="mail2">
                <Link to="/" style={{ fontSize: "19px" }} onClick={onClose}>
                  <i className="fa fa-home" aria-hidden="true"></i> Home
                </Link>
              </Menu.Item>
              <Menu.Item key="load">
                <a href="https://moru.com.np/" style={{ fontSize: "19px" }}>
                  <i className="fa fa-wallet" aria-hidden="true"></i> Load Fund
                </a>
              </Menu.Item>

              {userInfo && (
                <Menu.Item key="alipay22">
                  <Link
                    to="/addblog"
                    style={{ fontSize: "19px" }}
                    onClick={onClose}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Create
                    Blog
                  </Link>
                </Menu.Item>
              )}
              <SubMenu
                key="SubMenu2"
                title={
                  <span>
                    {" "}
                    <i className="fa fa-user" aria-hidden="true"></i> About Us
                  </span>
                }
                style={{ fontSize: "19px" }}
              >
                <MenuItemGroup>
                  <Link
                    to="/companyprofile"
                    style={{ color: "black" }}
                    onClick={onClose}
                  >
                    <Menu.Item key="companyprofile">Company Profile</Menu.Item>
                  </Link>

                  <Link to="/mantra">
                    <Menu.Item
                      key="mantra"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Mantra
                    </Menu.Item>
                  </Link>
                  <Link to="/objectives">
                    <Menu.Item
                      key="objectives"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Strategic Objectives
                    </Menu.Item>
                  </Link>
                  <Link to="/ourgovernance">
                    <Menu.Item
                      key="ourgovernance"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Corporate Governance
                    </Menu.Item>
                  </Link>
                  <Link to="/committee">
                    <Menu.Item
                      key="committe"
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
                  key="userInfo"
                  title={user ? user.username : "Profile"}
                  style={{ fontSize: "19px" }}
                >
                  <MenuItemGroup>
                    <Menu.Item key="profilepage">
                      <Link to="/profilepage" onClick={onClose}>
                        Profile page
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={() => logOut()}>
                      Log Out
                    </Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              ) : (
                <Menu.Item key="signin">
                  <Link
                    to="/login"
                    style={{ fontSize: "19px" }}
                    onClick={onClose}
                  >
                    {/* <UserAddOutlined style={{ fontSize: "18px" }} /> */}
                    <i className="fa fa-user" aria-hidden="true"></i> SignIn
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
