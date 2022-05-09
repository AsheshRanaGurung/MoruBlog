import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { CalendarOutlined } from "@ant-design/icons";
import ColorBadge from "../components/ColorBadge";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleBlog = async () => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);

    const relatedPostData = await axios.get(
      `http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`
    );
    // console.log(relatedPostData.data);
    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response.data);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Something is wrong!");
    }
  };

  const excerpt = (string) => {
    if (string?.length > 60) {
      string = string.substring(0, 60) + "...";
    }
    return string;
  };

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, []);
  //i removed dependency array

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px",
  };
  return (
    <div className="pagecontainer">
      {/* <div className="LoginPage"> */}
      <MDBContainer>
        <button className="submitBtn" onClick={() => navigate("/")}>
          Go back
        </button>
        <MDBTypography
          tag="h2"
          className="text-muted mt-2"
          style={{ display: "inline-block" }}
        >
          {blog && blog.title}
        </MDBTypography>
        <img
          className="img-fluid rounded"
          style={{ width: "100%", maxHeight: "600px" }}
          alt="This is blog"
          src="/images/Blog.jpg"
        ></img>
        <div style={{ marginTop: "20px" }}>
          <div style={{ height: "40px", background: "#f6f6f6" }}>
            {/* <MDBIcon
              style={{ float: "left" }}
              className="mt-3"
              far
              icon="calender-alt"
              size="lg"
            /> */}
            <CalendarOutlined style={{ float: "left", marginTop: "10px" }} />
            <strong style={{ float: "left", margin: "7px 0 0 2px" }}>
              {blog && blog.date}
            </strong>

            <ColorBadge styleInfo={styleInfo}>
              {blog && blog.category}
            </ColorBadge>
          </div>
          <div style={{ marginBottom: "20px", textAlign: "justify" }}>
            {blog && blog.blog}
          </div>{" "}
        </div>
        {relatedPost && relatedPost.length > 0 && (
          <>
            {relatedPost.length > 1 && <h1>Related Post</h1>}
            <MDBRow className="row-cols-1 row-cols-md-3 g-4 pb-3">
              {relatedPost
                .filter((item) => item.id != id)
                .map((item, index) => (
                  <MDBCol key={index}>
                    <MDBCard style={{ width: "100%" }}>
                      <MDBCardImage
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        alt={item.title}
                      ></MDBCardImage>
                      <MDBCardBody>
                        <MDBCardText>{item.date}</MDBCardText>
                        <MDBCardTitle>{item.title}</MDBCardTitle>
                        <MDBCardText style={{ display: "left", padding: "0" }}>
                          {excerpt(item.blog)}
                          <Link to={`/blog/${item.id}`}> Read more</Link>
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
            </MDBRow>
          </>
        )}
      </MDBContainer>
    </div>
  );
};

export default Blog;
