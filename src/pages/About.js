import React from "react";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { createNewBlog } from "../redux/CreateBlog";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { getApiDataSuccess } from "../redux/GetApiData";

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
  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const loadBlogsData = async () => {
    const response2 = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/posts"
    );
    // console.log("response2", response2?.data?.posts);
    dispatch(getApiDataSuccess(response2?.data?.posts));
  };

  const onFinish = async (values) => {
    // const nowDate = getDate();

    // console.log(values.blog);
    // console.log(values.title);
    // console.log(values.category);

    const config = {
      headers: {
        access_token: token,
      },
    };

    const response = await axios.post(
      "https://flaskapi-sanjeev.herokuapp.com/posts/new",
      {
        content: values.blog,
        title: values.title,
        // category:values.category
      },
      config
    );

    if ((response.status = 201)) {
      // dispatch(createNewBlog({

      // }));
      loadBlogsData();

      toast.success("Blog created successfully");

      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
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
