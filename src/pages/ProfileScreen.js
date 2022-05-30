import React, { useState } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [updateloading, setUpdateloading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const navigate = useNavigate();

  const onFinish = (values) => {
    setUpdateloading(true);

    // const response= await axios.put(`https://flaskapi-sanjeev.herokuapp.com/users/${id}/update`,{
    //   username:values.username,
    //   email:values.email,
    //   password:values.password,
    // })

    // if(response?.status===200){
    //   setUpdateloading(false)
    //   toast.success("User updated Successfully");
    //   navigate("/")
    // }
    // if (response?.status === 401) {
    //   console.log(response);
    //   toast.error(response.message);
    // }
    console.log("Received values of name ", values.username);
    console.log("Received values of email: ", values.email);
    console.log("Received values of pswd: ", values.password);
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
                remember: true,
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
