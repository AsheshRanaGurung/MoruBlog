import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

import axios from "axios";
import { toast } from "react-toastify";

const Resetpage = () => {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const onFinish = async (values) => {
    setIsloading(true);
    const response = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/generate_token/${values.email}`
    );
    if (response.status === 200) {
      setIsloading(false);
      toast.success(response.data.message);
      navigate("/");
    } else {
      setIsloading(false);
      navigate("/");
      toast.error(response.data.message);
    }
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
            <div className="reset-password">
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
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default Resetpage;
