import React, { useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteThisBlog } from "../../redux/GetUnverifiedBlogs";
import { loadBlogsData } from "../../redux/GetApiData";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const VerifyBlogModal = ({
  blogId,
  title,
  image,
  category,
  message,
  isModalVisible,
  handleCancel,
}) => {
  const [verifyblog, setVerifyBlog] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const { id } = useParams();
  var data;
  const getUnverifiedBlogs = async () => {
    const config = {
      headers: {
        access_token: token,
      },
    };
    await axios
      .get("https://flaskapi-sanjeev.herokuapp.com/posts/review", config)
      .then((res) => {
        dispatch(getUnverifiedBlogs(res.data.posts));
      });
  };

  const onFinish = async (values) => {
    setVerifyBlog(true);

    const config = {
      headers: {
        access_token: token,
      },
    };
    await axios
      .put(
        `https://flaskapi-sanjeev.herokuapp.com/posts/review/${blogId}`,
        {
          is_accepted: true,
        },
        config
      )
      .then((res) => {
        setVerifyBlog(false);
        dispatch(deleteThisBlog(blogId));
        dispatch(loadBlogsData());
        handleCancel();
        toast.success("Blog verified successfully");
      })
      .catch((err) => {
        setVerifyBlog(false);
      });
  };
  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        centered
        width={890}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <img src={image} style={{ width: "100%" }} />
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            title: title,
            category: category,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter your title" }]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter your category" }]}
          >
            <Input></Input>
          </Form.Item>
          <CKEditor
            editor={ClassicEditor}
            data={message}
            onChange={(event, editor) => {
              data = editor.getData();
            }}
          />

          <div style={{ display: "flex", justifyContent: "right" }}>
            <button className="submitBtn" type="primary">
              {verifyblog ? (
                <Spin
                  indicator={antIcon}
                  style={{ margin: "auto", color: "white" }}
                />
              ) : (
                <div style={{ margin: "auto", color: "white" }}>Verify</div>
              )}
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default VerifyBlogModal;
