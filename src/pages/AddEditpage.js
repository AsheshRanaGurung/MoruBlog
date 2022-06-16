// //s8l9wkk3

import React, { useState } from "react";
import { Form, Input, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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

  const getData = useSelector((state) => state?.getBlogdetail);
  const { blog } = getData;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { id } = useParams();

  const onFinish = async (values) => {
    setUpdateLoading(true);
    const config = {
      headers: {
        access_token: token,
      },
    };

    const response = await axios.put(
      `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`,
      {
        title: values.title,
        content: values.blog,
        category: values.category.replace(/\s/g, ""),
      },
      config
    );
    // dispatch(createNewBlog(response.data));

    if (response.status === 200) {
      setUpdateLoading(false);
      toast.success("Blog edited successfully");
      console.log(response.data);

      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
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
        initialValues={{ title: blog?.title, blog: blog?.description }}
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
              {/* {JSON.stringify(titles)}
              {JSON.stringify(desc)} */}

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

            {/* <Form.Item
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
            </Form.Item> */}
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
