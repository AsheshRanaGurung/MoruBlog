import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";

import { Link } from "react-router-dom";

const Login = () => {
  //   const redirect = location.search ? location.search.split("=")[1] : "/";
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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

                <Form.Item>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    style={{ float: "left" }}
                    noStyle
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Link className="login-form-forgot" to="/">
                    Forgot password
                  </Link>
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
                    Or <Link to="/register">Register Now!</Link>
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