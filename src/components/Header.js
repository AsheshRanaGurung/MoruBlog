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
import { Drawer, Button } from "antd";

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
        <div className="logo">
          <img
            src="/images/moru2.png"
            alt="logo"
            style={{ height: "50px" }}
          ></img>
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
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default Header;
