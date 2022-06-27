// //s8l9wkk3

import React, { useState } from "react";
import { Form, Input, Select, Spin } from "antd";
import { ConsoleSqlOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { loadBlogsData } from "../redux/GetApiData";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const { Option } = Select;
const options = ["Latest Offer", "Trending", "New Event", "Stories", "Careers"];

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddEditpage = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;
  var data;
  const getData = useSelector((state) => state?.getBlogdetail);
  const { blog } = getData;
  const [contentMessage, setContentMesasge] = useState(blog?.description);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { id } = useParams();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setUpdateLoading(true);
    const config = {
      headers: {
        access_token: token,
      },
    };

    const response = await axios
      .put(
        `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`,
        {
          title: values.title,
          content: data ? data : contentMessage,
          category: values.category.replace(/\s/g, ""),
        },
        config
      )
      .then((res) => {
        setUpdateLoading(false);
        toast.success("Blog edited successfully");
        navigate("/");
        dispatch(loadBlogsData());
      })
      .catch((err) => {
        setUpdateLoading(false);
        toast.error(err.data.message.content[0]);
      });
  };

  return (
    <div className="pagecontainer">
      <Form
        {...layout}
        name="nest-messages"
        layout="vertical"
        initialValues={{ title: blog?.title }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{ marginTop: "50px" }}
      >
        <MDBRow>
          <MDBCol md={4}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select Blog Topic!" }]}
            >
              <Select placeholder="select your blog topic">
                {options.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </MDBCol>
          <MDBCol md={8}>
            <CKEditor
              editor={ClassicEditor}
              data={blog?.description}
              onReady={(editor) => {
                data = editor.getData();
              }}
              onChange={(event, editor) => {
                data = editor.getData();
              }}
            />
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <button className="submitBtn" type="primary">
                {updateLoading ? (
                  <Spin
                    indicator={antIcon}
                    style={{ margin: "auto", color: "white" }}
                  />
                ) : (
                  <div style={{ margin: "auto", color: "white" }}>Update</div>
                )}
              </button>
            </Form.Item>
          </MDBCol>
        </MDBRow>
      </Form>
    </div>
  );
};

export default AddEditpage;
