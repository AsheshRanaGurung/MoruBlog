import axios from "axios";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThisUser, GetUserDetailssuccess } from "../../redux/GetAllUsers";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const GetAllUser = () => {
  const [user, setUser] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 8,
    },
    loading: false,
  });
  const { data, pagination, loading } = user;

  const getallusers = useSelector((state) => state.getUserDetails?.users);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const dispatch = useDispatch();

  const getallUsers = async () => {
    const response = await axios.get(
      "https://flaskapi-sanjeev.herokuapp.com/account"
    );
    if (response.status === 200) {
      dispatch(GetUserDetailssuccess(response.data.users));
    }
  };
  const columns = [
    {
      title: "ID",
      sorter: (a, b) => a.id - b.id,
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "username",
      render: (name) => `${name}`,
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      sorter: (a, b) => a.date - b.date,
      title: "Date",
      dataIndex: "created_at",
      width: "10%",
      render: (record) => <>{record.slice(0, 10)}</>,
    },
    {
      title: "Is Admin",
      dataIndex: "is_admin",
      width: "10%",
      render: (record) => <>{record === true ? "True" : "False"}</>,
    },

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
            onClick={() => onDelete(record)}
            style={{ color: "red", marginLeft: "12px" }}
          />
        </>
      ),
      width: "10%",
    },
  ];
  const onDelete = async (record) => {
    if (window.confirm("Are you sure you want to Delete this user?")) {
      const config = {
        headers: {
          access_token: token,
        },
      };
      const response = await axios.delete(
        `https://flaskapi-sanjeev.herokuapp.com/delete_user/${record.id}`,

        config
      );
      if (response.status === 200) {
        dispatch(deleteThisUser(record.id));

        toast.success("User deleted successfully");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setUser({ loading: true });
    setUser({
      loading: false,
      data: getallusers,
      pagination: {
        ...params.pagination,
        total: getallusers.totalCount,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  };
  useEffect(() => {
    getallUsers();
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

export default GetAllUser;
