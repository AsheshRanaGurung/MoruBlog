import React, { useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetUserDetailssuccess } from "../../redux/GetAllUsers";

const VerifyBlogModal = ({
  title,
  category,
  message,
  isModalVisible,
  handleCancel,
}) => {
  const [loginLoading, setLoginLoading] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const { id } = useParams();

  const onFinish = async (values) => {
    setLoginLoading(true);

    const config = {
      headers: {
        access_token: token,
      },
    };
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
            content: message,
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
              {loginLoading ? (
                <Spin
                  indicator={antIcon}
                  style={{ margin: "auto", color: "white" }}
                />
              ) : (
                <div style={{ margin: "auto", color: "white" }}>Verify</div>
              )}
            </button>
            <button className="submitBtn" type="primary">
              {loginLoading ? (
                <Spin
                  indicator={antIcon}
                  style={{ margin: "auto", color: "white" }}
                />
              ) : (
                <div style={{ margin: "auto", color: "white" }}>Discard</div>
              )}
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default VerifyBlogModal;
