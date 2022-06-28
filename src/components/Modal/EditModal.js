import React, { useState } from "react";
import { Form, Input, Modal, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetUserDetailssuccess } from "../../redux/GetAllUsers";

const EditModal = ({ name, id, isModalVisible, handleCancel }) => {
  const [loginLoading, setLoginLoading] = useState(false);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();

  const getallUsers = async () => {
    await axios
      .get("https://flaskapi-sanjeev.herokuapp.com/users")
      .then((res) => {
        dispatch(GetUserDetailssuccess(res.data.users));
      });
  };

  const onFinish = async (values) => {
    setLoginLoading(true);

    const config = {
      headers: {
        access_token: token,
      },
    };

    await axios
      .put(
        `https://flaskapi-sanjeev.herokuapp.com/user/${id}`,
        {
          username: values.review,
        },
        config
      )
      .then((res) => {
        setLoginLoading(false);
        getallUsers();
        toast.success("User updated successfully");
        handleCancel();
      })
      .catch((err) => {
        setLoginLoading(false);

        toast.error(err.response.data);
      });
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
          initialValues={{ review: name }}
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
