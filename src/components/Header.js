// import React, { useState } from "react";
// import {
//   MDBNavbar,
//   MDBContainer,
//   MDBIcon,
//   MDBNavbarNav,
//   MDBNavbarItem,
//   MDBNavbarLink,
//   MDBNavbarToggler,
//   MDBNavbarBrand,
//   MDBCollapse,
// } from "mdb-react-ui-kit";
// import { Link, NavLink } from "react-router-dom";

// function Header() {
//   const [showNavColorThird, setShowNavColorThird] = useState(false);

//   return (
//     <div>
//       <MDBNavbar expand="lg" light style={{ backgroundColor: "#e3f2fd" }}>
//         <MDBContainer fluid>
//           <MDBNavbarBrand href="#">
// <img
//   src="/images/moru2.png"
//   alt="logo"
//   style={{ height: "50px" }}
// ></img>
//           </MDBNavbarBrand>
//           <MDBNavbarToggler
//             type="button"
//             data-target="#navbarColor02"
//             aria-controls="navbarColor02"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//             onClick={() => setShowNavColorThird(!showNavColorThird)}
//           >
//             <MDBIcon icon="bars" fas />
//           </MDBNavbarToggler>
//           <MDBCollapse show={showNavColorThird} navbar>
//             <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
//               <MDBNavbarItem className="active" style={{ margin: "0.75rem" }}>
// <Link to="/" style={{ color: "black" }}>
//   Home
// </Link>
//               </MDBNavbarItem>
//               <MDBNavbarItem style={{ margin: "0.75rem" }}>
//                 <Link to="addBlog" style={{ color: "black" }}>
//                   Add Blog
//                 </Link>
//               </MDBNavbarItem>
//               <MDBNavbarItem style={{ margin: "0.75rem" }}>
// <NavLink to="about" style={{ color: "black" }}>
//   About
// </NavLink>
//               </MDBNavbarItem>
//             </MDBNavbarNav>
//           </MDBCollapse>
//         </MDBContainer>
//       </MDBNavbar>
//     </div>
//   );
// }

// export default Header;

import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Menu } from "antd";
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Header extends Component {
  state = {
    current: "mail",
    visible: false,
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
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
              onClick={this.showDrawer}
            >
              <span className="barsBtn"></span>
            </button>
            <Drawer
              title="Basic Drawer"
              placement="top"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <Menu>
                <Menu.Item key="mail">
                  <Link
                    to="/"
                    style={{ fontSize: "19px" }}
                    onClick={this.onClose}
                  >
                    Home
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="SubMenu"
                  title={<span>Blogs</span>}
                  style={{ fontSize: "19px" }}
                >
                  <MenuItemGroup title="Blog Category">
                    <Menu.Item key="setting:1" onClick={this.onClose}>
                      Hot News{" "}
                    </Menu.Item>
                    <Menu.Item key="setting:2" onClick={this.onClose}>
                      National news{" "}
                    </Menu.Item>
                    <Menu.Item key="setting:3" onClick={this.onClose}>
                      Business News
                    </Menu.Item>
                    <Menu.Item key="setting:4" onClick={this.onClose}>
                      International News
                    </Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="alipay2">
                  <Link
                    to="/addblog"
                    style={{ fontSize: "19px" }}
                    onClick={this.onClose}
                  >
                    Create Blog
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="SubMenu2"
                  title={<span>About Us</span>}
                  style={{ fontSize: "19px" }}
                >
                  <MenuItemGroup>
                    <Link
                      to="/companyprofile"
                      style={{ color: "black" }}
                      onClick={this.onClose}
                    >
                      <Menu.Item key="settings:1">Company Profile</Menu.Item>
                    </Link>
                    <Link to="/team">
                      <Menu.Item
                        key="settings:2"
                        style={{ color: "black" }}
                        onClick={this.onClose}
                      >
                        Team{" "}
                      </Menu.Item>
                    </Link>
                    <Link to="/mantra">
                      <Menu.Item
                        key="settings:4"
                        style={{ color: "black" }}
                        onClick={this.onClose}
                      >
                        Mantra
                      </Menu.Item>
                    </Link>
                    <Link to="/objectives">
                      <Menu.Item
                        key="settings:3"
                        style={{ color: "black" }}
                        onClick={this.onClose}
                      >
                        Strategic Objectives
                      </Menu.Item>
                    </Link>
                    <Link to="/ourgovernance">
                      <Menu.Item
                        key="settings:5"
                        style={{ color: "black" }}
                        onClick={this.onClose}
                      >
                        Corporate Governance
                      </Menu.Item>
                    </Link>
                    <Link to="/committee">
                      <Menu.Item
                        key="settings:6"
                        style={{ color: "black" }}
                        onClick={this.onClose}
                      >
                        Committees formed by Board
                      </Menu.Item>
                    </Link>
                  </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="mail2">
                  <Link
                    to="/login"
                    style={{ fontSize: "19px" }}
                    onClick={this.onClose}
                  >
                    {/* <UserAddOutlined style={{ fontSize: "18px" }} /> */}
                    SignIn
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="SubMenu3"
                  title={<span>Profile</span>}
                  style={{ fontSize: "19px" }}
                >
                  <MenuItemGroup>
                    <Menu.Item key="setting:1">
                      <Link to="/profilepage" onClick={this.onClose}>
                        Profile page
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2" onClick={this.onClose}>
                      Log Out{" "}
                    </Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              </Menu>
            </Drawer>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
