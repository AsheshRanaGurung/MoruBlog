import React from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardImage, MDBCardTitle } from "mdb-react-ui-kit";

const LatestBlog = ({ id, title, created_at }) => {
  return (
    <div>
      <Link to={`/blog/${id}`}>
        <MDBCard style={{ width: "100%", marginBottom: "20px" }}>
          <MDBCardImage
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            alt={title}
          ></MDBCardImage>

          {/* <MDBCardText>{created_at}</MDBCardText> */}
          <MDBCardTitle>{title}</MDBCardTitle>
        </MDBCard>
      </Link>
    </div>
  );
};

export default LatestBlog;
