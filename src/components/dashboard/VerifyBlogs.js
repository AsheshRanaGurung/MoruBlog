import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// import { GetUnverifiedBlog } from "../../redux/GetUnverifiedBlogs";

import VerifyBlogModal from "../Modal/VerifyBlogModal";
import DiscardBlogModal from "../Modal/DiscardBlogModal";

const VerifyBlogs = () => {
  const [unverifiedBlogs, setVerifiedBlogs] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 8,
    },
    loading: false,
  });
  const { data, pagination } = unverifiedBlogs;
  const [notVerifiedId, setNotVerifiedId] = useState("");

  const [id, setid] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [image, setimage] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [discardModalVisible, setDiscardModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setDiscardModalVisible(false);
  };

  const getUnverifiedBlog = useSelector((state) => state.getUnverifiedBlog);
  const { blogs } = getUnverifiedBlog;

  const editThisBlog = (record) => {
    setid(record.id);
    setTitle(record.title);
    setCategory(record.category);
    setMessage(record.content);
    setimage(record.image);
    setIsModalVisible(true);
  };

  const onDelete = (record) => {
    setNotVerifiedId(record.id);
    setDiscardModalVisible(true);
  };
  const columns = [
    {
      title: "Blog ID",
      sorter: (a, b) => a.id - b.id,
      dataIndex: "id",
      width: "2%",
      fixed: "left",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "6%",
      key: "1",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "2%",
      key: "2",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      width: "3%",
      key: "5",
      render: (record) => <>{record.slice(0, 10)}</>,
    },
    {
      title: "Author",
      dataIndex: "author",
      render: (record) => <>{record.username}</>,
      width: "3%",
      key: "3",
    },
    {
      title: "Email",
      dataIndex: "author",
      render: (record) => <>{record.email}</>,
      width: "10%",
      key: "4",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <EditOutlined onClick={() => editThisBlog(record)} />

          <DeleteOutlined
            onClick={() => onDelete(record)}
            style={{ color: "red", marginLeft: "12px" }}
          />
        </>
      ),
      width: "2%",
      fixed: "right",
    },
  ];

  const fetch = (params = {}) => {
    setVerifiedBlogs({ loading: true });
    setVerifiedBlogs({
      loading: false,
      data: blogs,
      pagination: {
        ...params.pagination,
        total: blogs.totalCount,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  useEffect(() => {
    fetch();
  }, [blogs]);
  return (
    <>
      {isModalVisible && (
        <VerifyBlogModal
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          blogId={id}
          title={title}
          image={image}
          category={category}
          message={message}
        />
      )}
      {discardModalVisible && (
        <DiscardBlogModal
          discardModalVisible={discardModalVisible}
          handleCancel={handleCancel2}
          blogId={notVerifiedId}
        />
      )}
      <h4>Unverified Blogs</h4>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        scroll={{ x: 1300 }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default VerifyBlogs;
