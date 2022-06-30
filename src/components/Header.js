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
          <Link to="/" style={{ padding: "0px" }}>
            <img
              src="http://res.cloudinary.com/dpnxzofqd/image/upload/v1655885402/Moru-preset/paiqyssfbpizi8drdjsq.png "
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
          <button className="barsMenu" type="primary" onClick={showDrawer}>
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
                key="SubMenu69"
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
                    <Menu.Item key="companyprofile2">Company Profile</Menu.Item>
                  </Link>

                  <Link to="/mantra">
                    <Menu.Item
                      key="mantra2"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Mantra
                    </Menu.Item>
                  </Link>
                  <Link to="/objectives">
                    <Menu.Item
                      key="objectives2"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Strategic Objectives
                    </Menu.Item>
                  </Link>
                  <Link to="/ourgovernance">
                    <Menu.Item
                      key="ourgovernance2"
                      style={{ color: "black" }}
                      onClick={onClose}
                    >
                      Corporate Governance
                    </Menu.Item>
                  </Link>
                  <Link to="/committee">
                    <Menu.Item
                      key="committe2"
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
