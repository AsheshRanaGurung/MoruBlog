import React from "react";
// import { Card, Avatar, Col } from "antd";
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import ColorBadge from "./ColorBadge";

// const { Meta } = Card;

const Blogs = ({
  title,
  date,
  category,
  description,
  id,
  excerpt,
  handleDelete,
}) => {
  return (
    <MDBCard className="h-100 " style={{ width: "280px", margin: "0 10px" }}>
      <MDBCardImage
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        alt={title}
        position="top"
        style={{ maxWidth: "100%", height: "180px" }}
      />
      <MDBCardBody>
        <MDBCardText
          style={{ display: "flex", marginBottom: "0px", color: "#a3a199" }}
        >
          {date}
        </MDBCardText>

        <MDBCardTitle
          style={{ fontSize: "25px", display: "flex", padding: "0" }}
        >
          {title}
        </MDBCardTitle>
        <MDBCardText style={{ display: "left", padding: "0" }}>
          {excerpt(description)}
          <Link to={`/blog/${id}`}> Read more</Link>
        </MDBCardText>
        <ColorBadge>{category}</ColorBadge>
        {/* <button>delete</button> */}
      </MDBCardBody>
    </MDBCard>
  );
};

export default Blogs;
