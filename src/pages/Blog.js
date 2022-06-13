import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
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
import { GetThisBlogSuccess, GetThisBlogVote } from "../redux/GetThisBlog";
import ModalDesign from "../components/Modal/Modal";
import { fetchLatestBlog, getLatestDataSuccess } from "../redux/GetLatestBlog";

const Blog = () => {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentMessage, setCommentMessage] = useState(null);

  const [likes, setLikes] = useState();
  const [likeTrigger, setLikeTrigger] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const latestBlog2 = useSelector((state) => state.getLatestBLog);
  const { blogs } = latestBlog2;

  const comments = useSelector((state) => state.getBlogdetail?.blog);

  const userID = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  const getSingleBlog = async () => {
    const response = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`
    );

    if (response.status === 200) {
      setBlog(response?.data?.post);
      setLikes(response?.data?.post?.votes.length);
    } else {
      toast.error("Something is wrong!");
    }
  };

  const config = {
    headers: {
      access_token: token,
    },
  };

  const hitLike = async () => {
    if (!token) {
      alert("Login to Like the post !!!");
    } else {
      const response = await axios.post(
        `https://flaskapi-sanjeev.herokuapp.com/vote/${id}`,
        {},

        config
      );
      if (response.status === 200) {
        // toast.success("Voted succesfully");
        setLikeTrigger(!likeTrigger);
        // response.hasVoted === true ? setLikeIcon(true) : setLikeIcon(false);
      }
    }
  };
  const deleteThisComment = async (id) => {
    const response = await axios.delete(
      `https://flaskapi-sanjeev.herokuapp.com/comments/${id}`,

      config
    );

    if (response.status === 200) {
      toast.success("Comment deleted succesfully");
      getSingleBlog();
    }
  };

  const editThisComment = (id, message) => {
    setCommentId(id);
    setCommentMessage(message);
    showModal();
  };
  useEffect(() => {
    if (id) {
      getSingleBlog();
      dispatch(fetchLatestBlog());
    }
  }, [id, likeTrigger]);

  const styleInfo = {
    float: "left",
    margin: "7px 0 15px 7px",
  };

  return (
    <div className="pagecontainer">
      <MDBRow>
        <MDBCol>
          <MDBContainer style={{ marginTop: "32px" }}>
            <ModalDesign
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              commentId={commentId}
              commentMessage={commentMessage}
            />

            <MDBTypography
              tag="h2"
              className="text-muted mt-2"
              style={{ display: "inline-block" }}
            >
              {blog && blog.title}
            </MDBTypography>
            <br />

            <div style={{ float: "left", margin: "7px 0 7px 7px" }}>
              by {blog && blog.author.username} |
            </div>
            <div style={{ float: "left", margin: "7px 0 7px 7px" }}>
              {blog && blog.created_at.slice(0, 10)} |
            </div>
            <ColorBadge styleInfo={styleInfo}>
              {blog && blog.category}
            </ColorBadge>

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
              <div style={{}}>{likes} Like(s)</div>
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
                  <MDBCol md={9}>
                    <MDBCardText
                      style={{
                        textAlign: "left",
                        margin: "5px 0px 0px 0px",
                        padding: "0px",
                      }}
                    >
                      {item.author.username} says:
                    </MDBCardText>
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
                  <MDBCol md={2}>
                    {item.author.id === userID?.id ? (
                      <div key={index}>
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "red", margin: "39px 10px 0 0" }}
                          size="sm"
                          onClick={() => deleteThisComment(item.id)}
                        />
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "blue", margin: "39px 10px 0 0" }}
                          size="sm"
                          onClick={() => editThisComment(item.id, item.message)}
                        />
                      </div>
                    ) : null}
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
              .slice(0, 3)
              .map((item, index) => <LatestBlog key={index} {...item} />)}
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Blog;
