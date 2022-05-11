// //s8l9wkk3

import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog } from "../redux/CreateBlog";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const { Option } = Select;
const options = [
  "National",
  "International",
  "Business",
  "Multimedia",
  "Sports",
];

const normFile = (e) => {
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

const AddEditpage = () => {
  const [titles, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = useSelector((state) => state?.getBlogdetail);
  // const { blog } = getData;

  // console.log("value", blog?.title);
  // useEffect(() => {
  //   if (blog) {
  //     setTitle(blog?.title);
  //     setDesc(blog?.blog);
  //   }
  // }, [blog]);

  const { id } = useParams();

  const onFinish = async (values) => {
    const nowDate = getDate();
    const blog = { ...values, date: nowDate };
    console.log(blog);
    // const response = await axios.post("http://localhost:5000/blogs", blog);
    // console.log(response.data);
    // dispatch(createNewBlog(response.data));

    // if ((response.status = 201)) {
    //   toast.success("Blog edited successfully");
    //   navigate("/");
    // } else {
    //   toast.error("Something went wrong");
    // }
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

  const editThisId = async () => {
    const response = await axios.put(`http://localhost:5000/blogs/${id}`);
    // console.log(response.data);
    // dispatch(getApiDataSuccess(response.data));
  };

  return (
    <div className="pagecontainer">
      <Form
        {...layout}
        name="nest-messages"
        layout="vertical"
        initialValues={{ title: getData?.title }}
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
              {/* {/* {JSON.stringify(blog)} */}
              {/* {JSON.stringify(getData.title)} */}

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
                value={desc}
              ></Input.TextArea>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <button className="submitBtn" type="primary">
                Update
              </button>
            </Form.Item>
          </MDBCol>
        </MDBRow>
      </Form>

      {/* 
       <form>
        title:
        <input value={titles} onChange={(e) => setTitle(e.target.value)} />
        <br />
        blog:
        <br />
        <br />
        <textarea
          rows="50"
          col="1000"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </form>
      */}
    </div>
  );
};

export default AddEditpage;
