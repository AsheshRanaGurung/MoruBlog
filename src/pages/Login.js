import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { login } from "../redux/UserLoggedInDetails";

const Login = () => {
  const userInfo = useSelector((state) => state.getLoggedInUserDetail);
  const { loggedinuserDetail, isLoading } = userInfo;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (loggedinuserDetail) {
      if (loggedinuserDetail?.is_admin === true) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [loggedinuserDetail, userInfo, navigate]);
  const onFinish = async (values) => {
    dispatch(login(values.email, values.password));
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
                    {isLoading ? (
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
