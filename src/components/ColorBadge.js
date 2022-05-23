import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

const ColorBadge = ({ children, styleInfo }) => {
  const color = {
    National: "success",
    International: "primary",
    Business: "info",
    Sports: "warning",
    Multimedia: "danger",
  };
  return (
    <div style={styleInfo}>
      <MDBBadge color={color[children]}>{children}</MDBBadge>
    </div>
  );
};

export default ColorBadge;
