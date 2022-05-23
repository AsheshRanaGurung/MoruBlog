import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
} from "mdb-react-ui-kit";

const LatestBlog = ({ id, title, date }) => {
  return (
    <div>
      <Link to={`/blog/${id}`}>
        <MDBCard
          style={{
            // width: "16rem",
            marginTop: "10px",
          }}
        >
          <MDBRow className="g-0">
            <MDBCol md="3">
              <MDBCardImage
                src="images/Food.jpg"
                alt={title}
                fluid
                // className="rounded-circle"
                style={{
                  height: "60px",
                  borderRadius: "8px",
                  marginTop: "12px",
                }}
              />
              {/* <img
                src="images/Tech1.jpg"
                alt={title}
                fluid
                style={{
                  height: "60px",
                  width: "100%",
                  alignItems: "center",
                }}
              ></img> */}
            </MDBCol>
            <MDBCol md="9">
              <MDBCardBody>
                <p className="text-start latest-title">{title}</p>
                {/* <strong>{date}</strong> */}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </Link>
    </div>
  );
};

export default LatestBlog;
