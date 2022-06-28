import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RemoveThisTokenSuccess } from "../redux/TokenHandle";
import { RemoveLoggedInUserDetailSuccess } from "../redux/UserLoggedInDetails";

const MenuItemGroup = Menu.ItemGroup;
const RightMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.getToken.token);

  const user = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail
  );

  const removeToken = () => {
    toast.success("Logged out Successfully!");
    navigate("/");
    localStorage.removeItem("MoruToken");
    dispatch(RemoveThisTokenSuccess());
    dispatch(RemoveLoggedInUserDetailSuccess());
    localStorage.removeItem("LoginUser");
  };
  return (
    <Menu mode="horizontal" className="bgColor">
      {userInfo ? (
        <SubMenu
          key="SubMenu2"
          title={user ? user.username : "Profile"}
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
            <i className="fas fa-user"></i> Log In
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
};
export default RightMenu;
