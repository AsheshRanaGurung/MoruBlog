import React from "react";
import { Modal } from "antd";

const BlogPostModal = ({ isModalVisible, handleCancel }) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        centered
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          <strong>
            Your blog will be verified by Moru before posting. Thankyou for your
            patience
          </strong>
        </p>
      </Modal>
    </>
  );
};

export default BlogPostModal;
