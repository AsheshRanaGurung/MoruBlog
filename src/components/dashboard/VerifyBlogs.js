import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThisUser, GetUserDetailssuccess } from "../../redux/GetAllUsers";
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
  const { data, pagination, loading } = unverifiedBlogs;
  const [notVerifiedId, setNotVerifiedId] = useState("");

  const [id, setid] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

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

  const dispatch = useDispatch();

  // const getUnverifiedBlogs = async () => {
  //   const config = {
  //     headers: {
  //       access_token: token,
  //     },
  //   };
  //   const response = await axios.get(
  //     "https://flaskapi-sanjeev.herokuapp.com/review_posts",
  //     config
  //   );
  //   if (response.status === 200) {
  //     dispatch(GetUnverifiedBlog(response.data.posts));
  //   }
  // };
  const editThisBlog = (record) => {
    setid(record.id);
    setTitle(record.title);
    setCategory(record.category);
    setMessage(record.content);
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
      // render: (record) => <>{record.id}</>,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "5%",
    },
    {
      title: "Author",
      dataIndex: "author",
      render: (record) => <>{record.username}</>,
      width: "5%",
    },
    {
      title: "Email",
      dataIndex: "author",
      render: (record) => <>{record.email}</>,
      width: "10%",
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
      width: "10%",
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
    // getUnverifiedBlogs();
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
        // rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        // loading={data.length === 0}
        onChange={handleTableChange}
      />
    </>
  );
};

export default VerifyBlogs;
