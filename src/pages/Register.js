import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const onFinish = async (values) => {
    setLoginLoading(true);

    await axios
      .post(
        "https://flaskapi-sanjeev.herokuapp.com/register",

        {
          username: values.username,
          email: values.email,
          password: values.password,
          is_admin: "false",
        }
      )
      .then((res) => {
        toast.success("Registered Successfully");
        setLoginLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoginLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="LoginPage">
      <div className="pagecontainer">
        <MDBRow>
          <MDBCol lg={6}>
            <div className="form-page">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Username"
                  name="username"
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
                  name="email"
                  label="E-mail"
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
                    {loginLoading ? <Spin indicator={antIcon} /> : "Register"}
                  </Button>
                  <br />
                  <br />
                  <div className="registerNow">
                    Or <Link to="/login">Have an account?</Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </MDBCol>
          <MDBCol className="LoginPage_image" lg={6}>
            <img
              src="/images/Morubanner.jpg"
              alt="banner"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            ></img>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};
export default Login;
