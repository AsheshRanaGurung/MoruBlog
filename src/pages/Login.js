import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GetThisTokenSuccess } from "../redux/TokenHandle";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { GetLoggedInUserDetailSuccess } from "../redux/UserLoggedInDetails";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  //   const redirect = location.search ? location.search.split("=")[1] : "/";
  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    setLoginLoading(true);

    var credentials = btoa(values?.email + ":" + values?.password);

    var basicAuth = "Basic " + credentials;

    const config = {
      headers: { Authorization: basicAuth },
      auth: {
        username: values.email,
        password: values.password,
      },
    };

    const response = await axios.post(
      "https://flaskapi-sanjeev.herokuapp.com/login",
      {},
      config
    );

    if (response?.status === 200) {
      localStorage.setItem("MoruToken", JSON.stringify(response.data.token));
      localStorage.setItem("LoginUser", JSON.stringify(response.data.user));

      setLoginLoading(false);
      toast.success("Logged In Successfully");

      dispatch(GetThisTokenSuccess(response.data.token));
      dispatch(GetLoggedInUserDetailSuccess(response.data.user));
      navigate("/");
    }

    if (response?.status === 401 || response?.status === 404) {
      setLoginLoading(false);
      toast.error("Something's wromg");
    }
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
                    {loginLoading ? (
                      <Spin indicator={antIcon} style={{ color: "white" }} />
                    ) : (
                      "Log in"
                    )}
                  </Button>
                  <br />
                  <br />
                  <div className="registerNow">
                    Or <Link to="/register">Register Now!</Link>
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
