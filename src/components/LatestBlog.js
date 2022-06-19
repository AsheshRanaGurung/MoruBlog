import React from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardImage, MDBCardTitle } from "mdb-react-ui-kit";

const LatestBlog = ({ id, title, image }) => {
  return (
    <div>
      <Link to={`/blog/${id}`}>
        <MDBCard
          style={{
            width: "100%",
            marginBottom: "20px",
            borderTopRadius: "8px",
          }}
        >
          <MDBCardImage
            src={image}
            alt={title}
            style={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              marginBottom: "8px",
            }}
          ></MDBCardImage>

          {/* <MDBCardText>{created_at}</MDBCardText> */}
          <MDBCardTitle>{title}</MDBCardTitle>
        </MDBCard>
      </Link>
    </div>
  );
};

export default LatestBlog;
