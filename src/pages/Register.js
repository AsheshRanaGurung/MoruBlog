import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

// import { GetThisTokenSuccess } from "../redux/TokenHandle";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import { useDispatch } from "react-redux";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const onFinish = async (values) => {
    // console.log("Received values of form: ", values);
    console.log("name", values.username);
    console.log("name", values.email);
    console.log("name", values.password);

    setLoginLoading(true);

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
      // localStorage.setItem("MoruToken", JSON.stringify(response.data.token));

      toast.success("Registered Successfully");
      setLoginLoading(false);
      // dispatch(GetThisTokenSuccess(response.data.token));

      navigate("/");
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
