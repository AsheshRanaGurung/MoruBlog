import React, { useState } from "react";
import { Form, Input, Modal, Button, Select, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetThisBlogSuccess } from "../../redux/GetThisBlog";
import { useParams } from "react-router-dom";
import { GetUserDetailssuccess } from "../../redux/GetAllUsers";

const EditModal = ({
  commentId,
  commentMessage,
  isModalVisible,
  handleCancel,
}) => {
  const [loginLoading, setLoginLoading] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const { id } = useParams();

  //   const updateComments = async () => {
  //     const response = await axios.get(
  //       `https://flaskapi-sanjeev.herokuapp.com/posts/${id}`
  //     );

  //     if (response.status === 200) {
  //       dispatch(GetThisBlogSuccess(response?.data?.post?.comments));
  //     }
  //   };
  const getallUsers = async () => {
    const response = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/account"
    );
    if (response.status === 200) {
      dispatch(GetUserDetailssuccess(response.data.users));
    }
  };

  const onFinish = async (values) => {
    setLoginLoading(true);

    const config = {
      headers: {
        access_token: token,
      },
    };

    const response = await axios.put(
      `https://flaskapi-sanjeev.herokuapp.com/update_user`,
      {
        username: values.review,
      },
      config
    );

    if (response.status === 200 || response.status === 201) {
      setLoginLoading(false);
      getallUsers();
      toast.success("User updated successfully");
      handleCancel();
    } else {
      setLoginLoading(false);

      toast.error("Something went wrong");
    }
  };
  const validateMessages = {
    required: "${label} is required!",
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ review: commentMessage }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="review"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input></Input>
          </Form.Item>

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
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
