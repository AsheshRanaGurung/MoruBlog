import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteThisBlog, getApiDataSuccess } from "../../redux/GetApiData";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { GetThisBlogSuccess } from "../../redux/GetThisBlog";

const getRandomuserParams = (params) => ({
  results: params?.pagination.pageSize,
  page: params?.pagination.current,
  ...params,
});

const BlogDetails = () => {
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 8,
    },
    loading: false,
  });

  const getData = useSelector((state) => state?.Blogs);
  const { blogs } = getData;

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const dispatch = useDispatch();
  const { data, pagination, loading } = state;

  const columns = [
    {
      title: "ID",
      sorter: (a, b) => a.id - b.id,
      dataIndex: "id",
      width: "2%",
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (name) => `${name}`,
      width: "15%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "5%",
    },
    {
      sorter: (a, b) => a.date - b.date,
      title: "Date",
      dataIndex: "created_at",
      width: "10%",
      render: (record) => <>{record.slice(0, 10)}</>,
    },
    {
      title: "Author",
      dataIndex: "author",
      width: "10%",
      render: (record) => <>{record.username}</>,
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <>
          <Link
            to={`edit-blog/${record.id}`}
            onClick={() => editThisBlog(record)}
          >
            <EditOutlined />
          </Link>
          <DeleteOutlined
            onClick={() => onDelete(record)}
            style={{ color: "red", marginLeft: "12px" }}
          />
        </>
      ),
      width: "10%",
    },
  ];

  const editThisBlog = async (record) => {
    dispatch(
      GetThisBlogSuccess({
        title: record.title,
        description: record.content,
      })
    );
  };

  const onDelete = async (record) => {
    if (window.confirm("Are you sure you want to Delete this Blog?")) {
      const config = {
        headers: {
          access_token: token,
        },
      };
      const response = await axios.delete(
        `https://flaskapi-sanjeev.herokuapp.com/posts/${record.id}/delete`,

        config
      );
      if (response.status === 200) {
        dispatch(deleteThisBlog(record.id));

        toast.success("Blog deleted successfully");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    fetch();
  }, [blogs]);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setState({ loading: true });
    setState({
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

export default BlogDetails;
