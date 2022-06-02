import axios from "axios";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThisUser, GetUserDetailssuccess } from "../../redux/GetAllUsers";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GetUnverifiedBlog } from "../../redux/GetUnverifiedBlogs";

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

  const getUnverifiedBlog = useSelector((state) => state.getUnverifiedBlog);
  const { blogs } = getUnverifiedBlog;

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;
  const dispatch = useDispatch();

  const getUnverifiedBlogs = async () => {
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/review_posts",
      config
    );
    if (response.status === 200) {
      dispatch(GetUnverifiedBlog(response.data.posts));
    }
  };

  const columns = [
    {
      title: "ID",
      sorter: (a, b) => a.id - b.id,
      dataIndex: "author",
      width: "2%",
      render: (record) => <>{record.id}</>,
    },
    {
      title: "Name",
      dataIndex: "username",
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
      title: "Title",
      dataIndex: "title",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "5%",
    },

    // {
    //   title: "Is Admin",
    //   dataIndex: "is_admin",
    //   width: "10%",
    //   render: (record) => <>{record === true ? "True" : "False"}</>,
    // },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Link
            to={`edit-blog/${record.id}`}
            // onClick={() => editThisBlog(record)}
          >
            <EditOutlined />
          </Link>
          <DeleteOutlined
            // onClick={() => onDelete(record)}
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
    getUnverifiedBlogs();
    fetch();
  }, []);
  return (
    <Table
      columns={columns}
      // rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={pagination}
      loading={data.length === 0}
      onChange={handleTableChange}
    />
  );
};

export default VerifyBlogs;
