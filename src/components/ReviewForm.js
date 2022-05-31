import React, { useState } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const ReviewForm = () => {
  const [loginLoading, setLoginLoading] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const onFinish = async (values) => {
    console.log(values);
    // setLoginLoading(true);

    // const config = {
    //   headers: {
    //     access_token: token,
    //   },
    // };

    // const response = await axios.post(
    //   "https://flaskapi-sanjeev.herokuapp.com/posts/new",
    //   {
    //     content: values.blog,
    //     title: values.title,
    //     category: values.category.replace(/\s/g, ""),
    //   },
    //   config
    // );

    // if ((response.status = 201)) {
    //   // dispatch(createNewBlog({

    //   // }));
    //   loadBlogsData();
    //   setLoginLoading(false);
    //   toast.success("Blog created successfully");

    //   navigate("/");
    // } else {
    //   toast.error("Something went wrong");
    // }
  };
  const validateMessages = {
    required: "${label} is required!",
  };
  return (
    <Form
      name="nest-messages"
      layout="vertical"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="review"
        label="Review"
        rules={[{ required: true, message: "Please write a review" }]}
      >
        <Input.TextArea
          rows={4}
          cols={10}
          showCount
          maxLength={1000}
        ></Input.TextArea>
      </Form.Item>

      <button className="submitBtn" type="primary">
        {loginLoading ? (
          <Spin
            indicator={antIcon}
            style={{ margin: "auto", color: "white" }}
          />
        ) : (
          <div style={{ margin: "auto", color: "white" }}>Submit</div>
        )}
      </button>
    </Form>
  );
};

export default ReviewForm;
