import React from "react";
import { Alert } from "antd";

function Message({ variant, children }) {
  return <Alert message={children} type={variant}></Alert>;
}

export default Message;
