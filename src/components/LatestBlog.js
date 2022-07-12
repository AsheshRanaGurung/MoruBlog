import React from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardImage, MDBCardTitle } from "mdb-react-ui-kit";

const LatestBlog = ({ id, title, image }) => {
  const excerpt2 = (string) => {
    if (string?.length > 45) {
      string = string.substring(0, 45) + "...";
    }
    return string;
  };
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
          <MDBCardTitle
            style={{
              fontSize: "18px",
              display: "flex",
              padding: "0",
              fontWeight: "400",
            }}
          >
            {excerpt2(title)}
          </MDBCardTitle>
        </MDBCard>
      </Link>
    </div>
  );
};

export default LatestBlog;
