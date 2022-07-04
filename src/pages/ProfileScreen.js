import React, { useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetLoggedInUserUpdateSuccess } from "../redux/UserLoggedInDetails";

const ProfileScreen = () => {
  const [updateloading, setUpdateloading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;
  const dispatch = useDispatch();
  const userDetail = useSelector(
    (state) => state.getLoggedInUserDetail.loggedinuserDetail
  );

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setUpdateloading(true);

    const config = {
      headers: {
        access_token: token,
      },
    };

    await axios
      .put(
        `https://flaskapi-sanjeev.herokuapp.com/users/${userDetail.id}`,
        {
          username: values.email,
        },
        config
      )
      .then((res) => {
        console.log(res.data.credentials.username);
        setUpdateloading(false);
        dispatch(GetLoggedInUserUpdateSuccess(res.data.credentials.username));
        navigate("/");
        toast.success("User updated successfully");
      })
      .catch((err) => {
        setUpdateloading(false);

        console.log(err);
      });
  };
  return (
    <div className="LoginPage">
      <div className="pagecontainer" style={{ marginBottom: "20px" }}>
        <MDBRow>
          <MDBCol md={6}>
            <h3>User Profile</h3>
            <Form
              name="profile-form"
              className="profile-form"
              initialValues={{
                email: userDetail?.username,
                username: userDetail?.email,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="E-mail"
                name="username"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{
                    backgroundColor: "#c70039",
                    border: "none",
                  }}
                >
                  {updateloading ? (
                    <Spin indicator={antIcon} style={{ color: "white" }} />
                  ) : (
                    "Update"
                  )}
                </Button>
                <br />
              </Form.Item>
            </Form>
          </MDBCol>
          <MDBCol>
            <img
              src="/images/user.gif"
              alt="user"
              style={{ width: "100%", height: "300px", objectFit: "contain" }}
            />
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default ProfileScreen;
