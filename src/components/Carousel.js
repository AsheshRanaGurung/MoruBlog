import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import ColorBadge from "./ColorBadge";
import { Link } from "react-router-dom";

const BlogCarousel = () => {
  const getData = useSelector((state) => state?.Blogs);
  const { blogs } = getData;
  const excerpt = (string) => {
    if (string?.length > 50) {
      string = string.substring(0, 50) + "...";
    }
    return string;
  };

  return (
    <MDBCarousel
      showIndicators
      dark
      // showControls
      style={{
        marginBottom: "40px",
        padding: "0px",
        boxShadow: "0px 7px 12px 0px rgb(184 180 180)",
      }}
    >
      <MDBCarouselInner>
        {blogs &&
          blogs.slice(0, 1).map((item, index) => (
            <MDBCarouselItem className="active" key={index}>
              <MDBRow>
                <MDBCol md={6} lg={6} sm={12} style={{ paddingRight: "0px" }}>
                  <Link to={`/blog/${item.id}`}>
                    <MDBCarouselElement
                      style={{ height: "235px" }}
                      src={item.image}
                      alt="image"
                    ></MDBCarouselElement>
                  </Link>
                </MDBCol>
                <MDBCol
                  style={{
                    backgroundColor: "rgb(245, 245, 244",
                    // paddingLeft: "0px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        marginTop: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <div style={{ float: "left" }}>
                        <h5 style={{ padding: "0px", fontFamily: "Open Sans" }}>
                          <strong>{item.title}</strong>
                        </h5>
                      </div>
                      <br />
                      <br />
                      <div style={{ float: "left" }}>
                        By: {item.author.username} |
                      </div>

                      <div style={{ float: "left" }}>
                        {item.created_at?.slice(0, 10)} |
                      </div>

                      <div style={{ float: "left" }}>
                        <ColorBadge>{item.category}</ColorBadge>
                      </div>
                      {/* <div style={{ float: "left" }}>
                        <Markup content={excerpt(item.content)} />
                      </div> */}
                    </div>

                    <div style={{ float: "left", paddingLeft: "10px" }}>
                      <Link
                        to={`/blog/${item.id}`}
                        style={{
                          display: "flex",
                          color: "#d6d6d6",
                          padding: "0",
                          fontSize: "12px",
                          margin: "10px 0px",
                        }}
                      >
                        {" "}
                        read more
                      </Link>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCarouselItem>
          ))}

        {blogs &&
          blogs.slice(1, 3).map((item, index) => (
            <MDBCarouselItem key={index}>
              <MDBRow>
                <MDBCol md={6} lg={6} sm={12} style={{ paddingRight: "0px" }}>
                  <Link to={`/blog/${item.id}`}>
                    <MDBCarouselElement
                      style={{ height: "235px" }}
                      src={item.image}
                      alt="image"
                    ></MDBCarouselElement>
                  </Link>
                </MDBCol>
                <MDBCol
                  style={{
                    backgroundColor: "rgb(245, 245, 244",
                    // paddingLeft: "0px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        marginTop: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <div style={{ float: "left" }}>
                        <h5 style={{ padding: "0px", fontFamily: "Open Sans" }}>
                          <strong>{item.title}</strong>
                        </h5>
                      </div>
                      <br />
                      <br />

                      <div style={{ float: "left" }}>
                        By: {item.author.username} |
                      </div>

                      <div style={{ float: "left" }}>
                        {item.created_at?.slice(0, 10)} |
                      </div>

                      <div style={{ float: "left" }}>
                        <ColorBadge>{item.category}</ColorBadge>
                      </div>
                    </div>

                    <div style={{ float: "left", paddingLeft: "10px" }}>
                      <Link
                        to={`/blog/${item.id}`}
                        style={{
                          display: "flex",
                          color: "#d6d6d6",
                          padding: "0",
                          fontSize: "12px",
                          margin: "10px 0px",
                        }}
                      >
                        {" "}
                        read more
                      </Link>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCarouselItem>
          ))}
      </MDBCarouselInner>
    </MDBCarousel>
  );
};

export default BlogCarousel;
