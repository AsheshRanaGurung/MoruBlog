import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

const ColorBadge = ({ children, styleInfo }) => {
  const color = {
    Careers: "success",
    LatestOffer: "primary",
    NewEvent: "info",
    Stories: "warning",
    Trending: "danger",
  };
  return (
    <div style={styleInfo}>
      <MDBBadge color={color[children]}>{children}</MDBBadge>
    </div>
  );
};

export default ColorBadge;
