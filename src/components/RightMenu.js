import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RemoveThisTokenSuccess } from "../redux/TokenHandle";

const MenuItemGroup = Menu.ItemGroup;
const RightMenu = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.getToken.token);

  const removeToken = () => {
    localStorage.removeItem("MoruToken");
    dispatch(RemoveThisTokenSuccess());
    toast.success("Logged out Sccessfully!");

    // alert("cliked");
  };
  return (
    <Menu mode="horizontal">
      {userInfo ? (
        <SubMenu
          key="SubMenu2"
          title={
            <span>
              <i className="fas fa-user"></i> Profile
            </span>
          }
          style={{ fontSize: "19px" }}
        >
          <MenuItemGroup>
            <Menu.Item key="setting:1">
              <Link to="/profilepage">Profile page</Link>
            </Menu.Item>
            <Menu.Item key="setting:2" onClick={() => removeToken()}>
              Log Out{" "}
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      ) : (
        <Menu.Item key="mail2">
          <Link to="/login" style={{ fontSize: "19px" }}>
            {/* <UserAddOutlined style={{ fontSize: "18px" }} /> */}
            <i className="fas fa-user"></i> Log In
          </Link>
        </Menu.Item>
      )}

      {/* <Menu.Item key="app">
          <Link to="/register" style={{ fontSize: "19px" }}>
            Signup
          </Link>
        </Menu.Item> */}
    </Menu>
  );
};
export default RightMenu;
