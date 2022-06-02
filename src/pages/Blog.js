import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { LikeTwoTone } from "@ant-design/icons";
import ColorBadge from "../components/ColorBadge";
import LatestBlog from "../components/LatestBlog";
import { Spin } from "antd";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../components/ReviewForm";
import { GetThisBlogSuccess } from "../redux/GetThisBlog";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const latestBlog2 = useSelector((state) => state.getLatestBLog);
  const { blogs } = latestBlog2;

  const comments = useSelector((state) => state.getBlogdetail?.blog);

  const { id } = useParams();

  const dispatch = useDispatch();

  const getSingleBlog = async () => {
    const response = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`
    );

    const relatedPostData = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts?category=${response.data.category}&_start=0&_end=3`
    );

    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response?.data?.post);
      //GetThisBlogSuccess is the redux store name for comments only
      dispatch(GetThisBlogSuccess(response?.data?.post?.comments));
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Something is wrong!");
    }
  };
  const hitLike = () => {
    alert("Like button pressed");
  };
  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);
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
                Author:{blog && blog.author.username},
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
            <div style={{ textAlign: "right" }}>
              <div style={{ marginTop: "10px" }}>
                If you Liked This Blog, Do Like it.{" "}
              </div>
              <LikeTwoTone
                onClick={() => hitLike()}
                className="likeButton"
                style={{ fontSize: "40px" }}
              />
            </div>

            <div style={{ marginBottom: "5px" }}>
              <h4>Reviews and comments</h4>
              {comments?.length === 0 && (
                <Message type="info">No comments.</Message>
              )}
              {comments?.map((item, index) => (
                <MDBRow key={index}>
                  <MDBCol md={1}>
                    <img
                      src="../images/user.jpg
      "
                      alt="imag"
                      fluid
                      style={{
                        height: "36px",
                        borderRadius: "50%",
                        margin: "12px 0",
                      }}
                    ></img>
                  </MDBCol>
                  <MDBCol md={10}>
                    <MDBCardText
                      style={{
                        textAlign: "left",
                        margin: "5px 0px 0px 0px",
                        padding: "0px",
                      }}
                    >
                      {item.author.username} says:
                    </MDBCardText>

                    {/* <MDBCardText style={{ textAlign: "left" }}>
                      {item.author.created_at}
                    </MDBCardText> */}

                    <MDBCardBody
                      style={{
                        display: "flex",

                        padding: "0px",
                      }}
                    >
                      <MDBCardText>
                        <strong>{item.message}</strong>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {token ? (
                <ReviewForm id={id} />
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
            blogs
              ?.filter((item) => item.id !== parseInt(id))
              .map((item, index) => <LatestBlog key={index} {...item} />)}
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Blog;
