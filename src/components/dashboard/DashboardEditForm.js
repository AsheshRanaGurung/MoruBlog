import React, { useState } from "react";
import { Form, Input, Upload, Button, Select, Spin } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { getApiDataSuccess } from "../../redux/GetApiData";
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
/* eslint-enable no-template-curly-in-string */

const DashboardEditForm = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;
  const getData = useSelector((state) => state?.getBlogdetail);
  const { blog } = getData;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const { id } = useParams();
  var data;
  const loadBlogsData = async () => {
    const response2 = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/posts"
    );

    dispatch(getApiDataSuccess(response2?.data?.posts));
  };
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
        content: data,
        category: values.category.replace(/\s/g, ""),
      },
      config
    );

    if (response.status === 200) {
      setUpdateLoading(false);
      loadBlogsData();

      toast.success("Blog edited successfully");
      //   console.log(response.data);

      navigate("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      Edit Blog
      <Form
        {...layout}
        name="nest-messages"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          title: blog?.title,
          // blog: ReactHtmlParser(blog?.description),
        }}
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
            <CKEditor
              editor={ClassicEditor}
              data={blog?.description}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
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

export default DashboardEditForm;
