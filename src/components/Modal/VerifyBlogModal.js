import React, { useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { deleteThisBlog } from "../../redux/GetUnverifiedBlogs";
import { loadBlogsData } from "../../redux/GetApiData";
import ReactHtmlParser from "react-html-parser";

const VerifyBlogModal = ({
  blogId,
  title,
  category,
  message,
  isModalVisible,
  handleCancel,
}) => {
  const [verifyblog, setVerifyBlog] = useState(false);
  const [discardblog, setDiscardBlog] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const { id } = useParams();

  const getUnverifiedBlogs = async () => {
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/review_posts",
      config
    );
    if (response.status === 200) {
      dispatch(getUnverifiedBlogs(response.data.posts));
    }
  };

  const onFinish = async (values) => {
    setVerifyBlog(true);

    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.put(
      `https://flaskapi-sanjeev.herokuapp.com/update_post_status/${blogId}`,
      {
        is_accepted: true,
      },
      config
    );
    if (response.status === 200) {
      setVerifyBlog(false);
      dispatch(deleteThisBlog(blogId));
      dispatch(loadBlogsData());

      handleCancel();
      toast.success("Blog verified successfully");
    }
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
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            title: title,

            category: category,
            content: ReactHtmlParser(message),
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
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter your Content" }]}
          >
            <Input.TextArea
              rows={18}
              cols={22}
              showCount
              maxLength={10000}
            ></Input.TextArea>
          </Form.Item>

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
