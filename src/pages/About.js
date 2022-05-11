import React, { useState } from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CreateNewBlog, { createNewBlog } from "../redux/CreateBlog";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};
/* eslint-disable no-template-curly-in-string */

const { Option } = Select;
const options = [
  "National",
  "International",
  "Business",
  "Multimedia",
  "Sports",
];

const normFile = (e) => {
  // console.log("Upload event1:", e.file);
  if (Array.isArray(e)) {
    return e;
  }
  const formData = new FormData();
  formData.append("file", e.file);
  formData.append("upload_preset", "s8l9wkk3");

  fetch("  https://api.cloudinary.com/v1_1/dpnxzofqd/image/upload/", {
    method: "post",
    body: formData,
  })
    .then((resp) => {
      toast.info("Image Uploaded successfully!");
      // console.log(resp);
    })
    .catch((error) => {
      toast.error("Something went wrong");
    });
  return e.fileList;
};

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
/* eslint-enable no-template-curly-in-string */

const About = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // console.log(values);
    // temporary post on json server

    const nowDate = getDate();
    const blog = { ...values, date: nowDate };
    const response = await axios.post("http://localhost:5000/blogs", blog);
    console.log(response.data);
    dispatch(createNewBlog(response.data));

    if ((response.status = 201)) {
      toast.success("Blog created successfully");
      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "/" + mm + "/" + dd;
    // console.log(today);

    return today;
  };
  return (
    <div className="pagecontainer">
      <Form
        {...layout}
        name="nest-messages"
        layout="vertical"
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
              {/* {JSON.stringify(desc)} */}

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

            <Form.Item
              name="upload"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="logo"
                // action={"http://localhost:3000/"}
                beforeUpload={() => false}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </MDBCol>
          <MDBCol md={8}>
            <Form.Item
              name="blog"
              label="Blog"
              rules={[{ required: true, message: "Please write a blog" }]}
            >
              <Input.TextArea
                rows={18}
                cols={22}
                showCount
                maxLength={10000}
              ></Input.TextArea>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <button className="submitBtn" type="primary">
                Submit
              </button>
            </Form.Item>
          </MDBCol>
        </MDBRow>
      </Form>
    </div>
  );
};

export default About;
