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
import { deleteThisBlog, getApiDataSuccess } from "../redux/GetApiData";
import { GetThisBlogSuccess } from "../redux/GetThisBlog";
import axios from "axios";
import { toast } from "react-toastify";

// const Blogs = ({ title, date, category, description, id, excerpt }) => {
const Blogs = ({
  title,
  date,
  category,
  description,
  id,
  image,
  excerpt,
  userIdWhoCreatedThisBLog,
}) => {
  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const user = useSelector(
    (state) => state.getLoggedInUserDetail?.loggedinuserDetail
  );
  // const getMonthNameDateString = (date) => {
  //   monthNamelist = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   return console.log(monthNamelist[date.getMonth()]);
  // };

  const dispatch = useDispatch();

  const excerpt2 = (string) => {
    if (string?.length > 45) {
      string = string.substring(0, 45) + "...";
    }
    return string;
  };

  const loadBlogsData = async () => {
    const response2 = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/posts"
    );
    console.log("response2", response2?.data?.posts);
    dispatch(getApiDataSuccess(response2?.data?.posts));
  };

  const deleteThisId = async (id) => {
    if (window.confirm("Are you sure you want to Delete this Blog?")) {
      const config = {
        headers: {
          access_token: token,
        },
      };
      const response = await axios.delete(
        `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`,

        config
      );
      if (response.status === 200) {
        dispatch(deleteThisBlog(id));
        loadBlogsData();

        toast.success("Blog deleted successfully");
        // console.log(response.data);
        // dispatch(getApiDataSuccess(response.data));
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const editThisBlog = async (id, title, description) => {
    dispatch(GetThisBlogSuccess({ title: title, description: description }));
  };

  return (
    <MDBCard className="h-100 blogCard " style={{ margin: "0 0px" }}>
      {/* {getMonthNameDateString()} */}
      <Link to={`/blog/${id}`}>
        <MDBCardImage
          src={image}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
      </Link>

      <MDBCardBody style={{ padding: "0.8rem 1.5rem 0.5rem" }}>
        <div
          style={{
            display: "flex",
            marginBottom: "0px",
            color: "#a3a199",
            justifyContent: "space-between",
          }}
        >
          {date?.slice(0, 10)}
          <ColorBadge>{category}</ColorBadge>
        </div>
        <MDBCardTitle
          style={{ fontSize: "23px", display: "flex", padding: "0" }}
        >
          {excerpt2(title)}
        </MDBCardTitle>
        <MDBCardText>
          <Link
            to={`/blog/${id}`}
            style={{
              display: "flex",
              color: "#d6d6d6",
              padding: "0",
              fontSize: "12px",
            }}
          >
            {" "}
            read more
          </Link>
        </MDBCardText>
        {/* <DeleteOutlined style={{ fontSize: "22px", color: "red" }} />
        <EditOutlined style={{ fontSize: "22px", color: "green" }} /> */}
        {(user?.is_admin || userIdWhoCreatedThisBLog === user?.id) && (
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
            <Link
              to={`/editblog/${id}`}
              onClick={() => editThisBlog(id, title, description)}
            >
              <MDBIcon fas icon="edit" style={{ color: "green" }} size="lg" />
            </Link>
          </>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default Blogs;
