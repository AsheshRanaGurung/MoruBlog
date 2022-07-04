import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { login } from "../redux/UserLoggedInDetails";
import axios from "axios";
import { toast } from "react-toastify";

const ResetFormpage = () => {
  const [isLoading, setIsloading] = useState(false);
  const [shownPasswordForm, setShowPasswordForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  let token;
  token = searchParams.get("token");

  const verifyToken = async () => {
    console.log("abc", token);
    axios
      .get(`https://flaskapi-sanjeev.herokuapp.com/verify_token/${token}`)
      .then((res) => {
        setShowPasswordForm(true);
        setUserID(res.data.user_id);
      })
      .catch((err) => {
        console.log(err);
        setShowPasswordForm(false);
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    verifyToken();
  }, []);
  const onFinish = async (values) => {
    setIsloading(true);
    await axios
      .put(`https://flaskapi-sanjeev.herokuapp.com/reset_password/${token}`, {
        password: values.password,
        confirm_password: values.confirm,
        user_id: userID,
      })
      .then((res) => {
        setIsloading(false);
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        setIsloading(false);
        navigate("/");
        toast.error(err.data.message);
      });
  };
  return (
    <div className="LoginPage">
      <div className="pagecontainer" style={{ paddingTop: "40px" }}>
        <MDBRow style={{ marginBottom: "30px" }}>
          <MDBCol md={5}>
            <img
              src="/images/forgot-password.gif"
              alt="forgot-password"
              style={{ height: "50vh", maxWidth: "100%" }}
            ></img>
          </MDBCol>
          <MDBCol className="LoginPage_image" md={7}>
            <div className="reset-password2">
              {shownPasswordForm ? (
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
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
                      style={{
                        backgroundColor: "#c70039",
                        border: "none",
                      }}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      {isLoading ? (
                        <Spin indicator={antIcon} style={{ color: "white" }} />
                      ) : (
                        "Reset password"
                      )}
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <p>please wait</p>
              )}
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default ResetFormpage;
