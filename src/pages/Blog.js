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
    const response = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`
    );

    const relatedPostData = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts?category=${response.data.category}&_start=0&_end=3`
    );
    // console.log(relatedPostData.data);
    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response?.data?.message);
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
            <br />
            <div style={{ textAlign: "left" }}>
              Author:{blog && blog.user.username}
            </div>{" "}
            <img
              className="img-fluid rounded"
              style={{ width: "100%", maxHeight: "600px" }}
              alt="This is blog"
              src="/images/Blog.jpg"
            ></img>
            <div style={{ marginTop: "20px" }}>
              <div style={{ height: "40px", background: "#f6f6f6" }}>
                <CalendarOutlined
                  style={{ float: "left", marginTop: "10px" }}
                />
                <strong style={{ float: "left", margin: "7px 0 0 2px" }}>
                  {blog && blog.created_at.slice(0, 10)}
                </strong>
                <ColorBadge styleInfo={styleInfo}>
                  {blog && blog.category}
                </ColorBadge>
              </div>
              <div style={{ marginBottom: "20px", textAlign: "justify" }}>
                {blog && blog.content}
              </div>{" "}
            </div>
          </MDBContainer>
        </MDBCol>
        <MDBCol lg={3} style={{ marginTop: "32px" }}>
          {relatedPost && relatedPost.length > 0 && (
            <>
              {relatedPost.length > 1 && <h3>Related Post</h3>}

              {relatedPost
                .filter((item) => item.id != id)
                .map((item, index) => (
                  <MDBCol key={index}>
                    <Link to={`/blog/${item.id}`}>
                      <MDBCard style={{ width: "100%", marginBottom: "20px" }}>
                        <MDBCardImage
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          alt={item.title}
                        ></MDBCardImage>
                        <MDBCardBody>
                          <MDBCardText>{item.date}</MDBCardText>
                          <MDBCardTitle>{item.title}</MDBCardTitle>
                          {/* <MDBCardText style={{ display: "left", padding: "0" }}>
                          {excerpt(item.blog)}
                          <Link to={`/blog/${item.id}`}> Read more</Link>
                        </MDBCardText> */}
                        </MDBCardBody>
                      </MDBCard>
                    </Link>
                  </MDBCol>
                ))}
            </>
          )}
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Blog;
