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
import LatestBlog from "../components/LatestBlog";
import { Spin } from "antd";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import ReviewForm from "../components/ReviewForm";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  // const [latestBlog, setLatestBlog] = useState([]);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const latestBlog2 = useSelector((state) => state.getLatestBLog);
  const { blogs } = latestBlog2;

  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleBlog = async () => {
    const response = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`
    );

    const relatedPostData = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts?category=${response.data.category}&_start=0&_end=3`
    );
    // console.log(relatedPostData.data);
    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response?.data?.post);
      // console.log(response.data.post);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Something is wrong!");
    }
  };

  // const excerpt = (string) => {
  //   if (string?.length > 60) {
  //     string = string.substring(0, 60) + "...";
  //   }
  //   return string;
  // };

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
      <MDBRow>
        <MDBCol>
          <MDBContainer style={{ marginTop: "32px" }}>
            {/* <button className="submitBtn" onClick={() => navigate("/")}>
              Go back
            </button> */}
            <MDBTypography
              tag="h2"
              className="text-muted mt-2"
              style={{ display: "inline-block" }}
            >
              {blog && blog.title}
            </MDBTypography>
            <br />

            <div style={{ height: "40px", background: "#f6f6f6" }}>
              <div style={{ float: "left", margin: "7px 0 0 2px" }}>
                Author:{blog && blog.user.username},
              </div>
              {/* <CalendarOutlined style={{ float: "left", marginTop: "10px" }} /> */}
              <strong style={{ float: "left", margin: "7px 0 0 2px" }}>
                {blog && blog.created_at.slice(0, 10)}
              </strong>
              <ColorBadge styleInfo={styleInfo}>
                {blog && blog.category}
              </ColorBadge>
            </div>
            <img
              className="img-fluid rounded"
              style={{ width: "100%", maxHeight: "600px" }}
              alt="This is blog"
              src="/images/Blog.jpg"
            ></img>
            <div style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "20px", textAlign: "justify" }}>
                {!blog?.content ? (
                  <Spin size="medium" style={{ display: "block" }} />
                ) : (
                  blog?.content
                )}
              </div>{" "}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Reviews</h4>
              {token ? (
                <ReviewForm />
              ) : (
                <div style={{ marginBottom: "10px" }}>
                  <Message type="info">
                    Please Login to review this blog
                  </Message>
                </div>
              )}
            </div>
          </MDBContainer>
        </MDBCol>
        <MDBCol lg={3} style={{ marginTop: "32px" }}>
          {blogs?.length === 0 ? (
            <Spin size="medium" style={{ display: "block" }} />
          ) : (
            <h3>Latest Post</h3>
          )}
          {blogs &&
            blogs?.map((item, index) => <LatestBlog key={index} {...item} />)}
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Blog;
