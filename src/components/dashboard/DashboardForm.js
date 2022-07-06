import React, { useState } from "react";
import { Form, Input, Upload, Button, Select, Spin } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { getApiDataSuccess } from "../../redux/GetApiData";
import { getunverified } from "../../redux/GetUnverifiedBlogs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

const DashboardForm = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [datas, setDatas] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e.file;
    }

    return e.fileList;
  };
  let address;

  const filechanged = async (e) => {
    let images = new FormData();
    images.append("file", e);
    images.append("upload_preset", "Moru-preset");
    await fetch("https://api.cloudinary.com/v1_1/dpnxzofqd/image/upload/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: images,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageApi = data;
        address = imageApi.url;
        toast.success("Image uploaded");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Please upload image again!");
      });
  };
  var data;
  const loadBlogsData = async () => {
    await axios
      .get("https://flaskapi-sanjeev.herokuapp.com/posts")
      .then((res) => {
        dispatch(getApiDataSuccess(res?.data?.posts));
      });
  };

  const onFinish = async (values) => {
    setLoginLoading(true);
    let formData = new FormData();

    const sendFormData = async () => {
      let a = await address;
      if (a === undefined) {
        formData.append(
          "image",
          "https://moru.com.np/wp-content/uploads/2022/01/Featured-image.jpg"
        );
      } else {
        formData.append("image", a);
      }

      formData.append("image", a);
      formData.append("content", datas);
      formData.append("title", values.title);
      formData.append("category", values.category.replace(/\s/g, ""));
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + "= " + pair[1]);
      // }

      fetch("https://flaskapi-sanjeev.herokuapp.com/posts/new", {
        method: "POST",
        body: formData,
        headers: {
          // "Content-type": "multipart/form-data",
          access_token: token,
        },
      }).then((res) => {
        if (res.status === 201) {
          loadBlogsData();
          setLoginLoading(false);
          toast.success("Blog created successfully");
          dispatch(getunverified(token));
          navigate("/dashboard");
        } else {
          toast.error("Something went wrong");
        }
      });
    };

    sendFormData();
  };

  return (
    <>
      <h4>Add New Blog</h4>
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
              onChange={(e) => filechanged(e.target.files[0])}
              getValueFromEvent={normFile}
            >
              <Upload name="logo" beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </MDBCol>
          <MDBCol md={8}>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "400px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                setDatas(editor.getData());
                data = editor.getData();
              }}
            />
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <button className="submitBtn" type="primary">
                {loginLoading ? (
                  <Spin
                    indicator={antIcon}
                    style={{ margin: "auto", color: "white" }}
                  />
                ) : (
                  <div style={{ margin: "auto", color: "white" }}>Submit</div>
                )}
              </button>
            </Form.Item>
          </MDBCol>
        </MDBRow>
      </Form>
    </>
  );
};

export default DashboardForm;
