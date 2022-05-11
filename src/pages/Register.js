import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    console.log("name", values.username);
    console.log("name", values.email);
    console.log("name", values.password);

    const response = await axios.post(
      "https://faker-rest.zeferinix.com/api/v1//auth/register",
      {
        firstName: values.username,
        lastName: values.username,
        username: values.username,
        email: values.email,
        password: values.password,
      }
    );

    if (response?.status === 200) {
      toast.success("Registered Successfully");
      navigate("/");
    }
  };

  return (
    <div className="LoginPage">
      <div className="pagecontainer" style={{ paddingTop: "0px" }}>
        <Row>
          <Col className="LoginPage_image" md={12}>
            <img
              src="/images/Morubanner.jpg"
              alt="banner"
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
            ></img>
          </Col>
          <Col md={12}>
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
                    Log in
                  </Button>
                  <br />
                  <br />
                  <div className="registerNow">
                    Or <Link to="/login">Have an account?</Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Login;
