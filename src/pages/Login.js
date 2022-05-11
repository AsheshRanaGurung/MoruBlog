import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GetThisTokenSuccess } from "../redux/TokenHandle";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const redirect = location.search ? location.search.split("=")[1] : "/";
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);

    const response = await axios.post(
      "https://faker-rest.zeferinix.com/api/v1/auth/login",
      { username: values.email, password: values.password }
    );

    if (response?.status === 200) {
      localStorage.setItem("MoruToken", JSON.stringify(response.data.token));
      toast.success("Logged In Successfully");

      dispatch(GetThisTokenSuccess(response.data.token));
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
