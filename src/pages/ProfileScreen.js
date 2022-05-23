import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Form, Input, Button } from "antd";

const ProfileScreen = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
                  Update
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
