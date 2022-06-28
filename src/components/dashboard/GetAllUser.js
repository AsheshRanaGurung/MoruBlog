import axios from "axios";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteThisUser } from "../../redux/GetAllUsers";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import EditModal from "../Modal/EditModal";

const GetAllUser = () => {
  const [user, setUser] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 8,
    },
    loading: false,
  });
  const { data, pagination } = user;
  const [id, setid] = useState("");
  const [title, setTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getallusers = useSelector((state) => state.getUserDetails?.users);

  const userToken = useSelector((state) => state.getToken);
  const { token } = userToken;

  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      sorter: (a, b) => a.id - b.id,
      dataIndex: "id",
      width: "2%",
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "username",
      render: (name) => `${name}`,
      width: "6%",
      key: "1",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
      key: "2",
    },
    {
      sorter: (a, b) => a.date - b.date,
      title: "Date",
      dataIndex: "created_at",
      width: "10%",
      render: (record) => <>{record.slice(0, 10)}</>,
      key: "3",
    },
    {
      title: "Is Admin",
      dataIndex: "is_admin",
      width: "10%",
      key: "4",
      render: (record) => <>{record === true ? "True" : "False"}</>,
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
      width: "3%",
      fixed: "right",
    },
  ];
  const onDelete = async (record) => {
    if (window.confirm("Are you sure you want to Delete this user?")) {
      const config = {
        headers: {
          access_token: token,
        },
      };
      await axios
        .delete(
          `https://flaskapi-sanjeev.herokuapp.com/user/${record.id}`,

          config
        )
        .then((res) => {
          dispatch(deleteThisUser(record.id));
          toast.success("User deleted successfully");
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    }
  };

  const editThisBlog = (record) => {
    setid(record.id);
    setTitle(record.username);
    setIsModalVisible(true);
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
    fetch();
  }, [getallusers]);
  return (
    <>
      {isModalVisible && (
        <EditModal
          name={title}
          id={id}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
        />
      )}{" "}
      <h4>User details</h4>
      <Table
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        scroll={{ x: 1300 }}
        dataSource={data}
        pagination={pagination}
        loading={data.length === 0}
        onChange={handleTableChange}
      />
    </>
  );
};

export default GetAllUser;
