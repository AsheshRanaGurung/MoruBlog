import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Card, Avatar, Col } from "antd";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import ColorBadge from "./ColorBadge";
import { deleteThisBlog } from "../redux/GetApiData";
import { GetThisBlogSuccess } from "../redux/GetThisBlog";
import axios from "axios";
import { toast } from "react-toastify";

const Blogs = ({ title, date, category, description, id, excerpt }) => {
  const userInfo = useSelector((state) => state.getToken.token);

  const dispatch = useDispatch();

  const deleteThisId = async (id) => {
    if (window.confirm("Are you sure you want to Delete this Blog?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        dispatch(deleteThisBlog(id));
        toast.success("Blog deleted successfully");
        // console.log(response.data);
        // dispatch(getApiDataSuccess(response.data));
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const editThisBlog = async (id) => {
    // console.log(id);
    // console.log(title);
    // console.log(desc);
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    // console.log(response.data);
    dispatch(GetThisBlogSuccess(response?.data));
  };

  return (
    <MDBCard className="h-100 " style={{ margin: "0 0px" }}>
      <Link to={`/blog/${id}`}>
        <MDBCardImage
          src="images/Tech1.jpg"
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
      </Link>
      <MDBCardBody>
        <MDBCardText
          style={{
            display: "flex",
            marginBottom: "0px",
            color: "#a3a199",
            justifyContent: "space-between",
          }}
        >
          {date}
          <ColorBadge>{category}</ColorBadge>
        </MDBCardText>
        <MDBCardTitle
          style={{ fontSize: "25px", display: "flex", padding: "0" }}
        >
          {title}
        </MDBCardTitle>
        <MDBCardText style={{ display: "left", padding: "0" }}>
          {excerpt(description)}
          <Link to={`/blog/${id}`}> Read more</Link>
        </MDBCardText>
        {/* <DeleteOutlined style={{ fontSize: "22px", color: "red" }} />
        <EditOutlined style={{ fontSize: "22px", color: "green" }} /> */}
        {userInfo && (
          <>
            <MDBBtn
              tag="a"
              className="mt-1"
              color="none"
              onClick={() => deleteThisId(id)}
            >
              <MDBIcon
                fas
                icon="trash"
                style={{ color: "red", marginRight: "10px" }}
                size="lg"
              />
            </MDBBtn>
            <Link to={`/editblog/${id}`} onClick={() => editThisBlog(id)}>
              <MDBIcon fas icon="edit" style={{ color: "green" }} size="lg" />
            </Link>
          </>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default Blogs;
