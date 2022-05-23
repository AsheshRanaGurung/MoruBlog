import React, { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useTable } from "react-table";

// const BlogDetails = () => {
//   const getData = useSelector((state) => state?.Blogs);
//   const { blogs } = getData;

//   const [allblogs, setAllblogs] = useState(blogs);

//   const tableColumn = [
//     {
//       Header: "ID",
//       accessor: "id",
//     },
//     {
//       Header: "Title",
//       accessor: "title",
//     },
//     {
//       Header: "Category",
//       accessor: "category",
//     },
//     {
//       Header: "Action",
//       Cell: ({ row }) => (
//         <>
//           <button
//             style={{ color: "blue", paddingRight: "0.75rem" }}
//             // onClick={() =>
//             //   editThisUser(
//             //     row.original.id,
//             //     row.original.name,
//             //     row.original.email
//             //   )
//             // }
//           >
//             <i className="bi bi-pen"></i>
//           </button>
//           <button
//             style={{ color: "#e78787" }}
//             // onClick={() => deleteThisUser(row.original.id)}
//           >
//             <i className="bi bi-trash3"></i>
//           </button>
//         </>
//       ),
//     },
//   ];

//   const columns = useMemo(() => tableColumn, []);
//   const data = useMemo(() => allblogs, [allblogs]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({
//       columns,
//       data: data || [],
//     });

//   useEffect(() => {
//     setAllblogs(blogs);
//   }, [blogs]);
//   return (
//     <div>
//       BlogDetails
//       <table variant="striped" colorScheme="gray" {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BlogDetails;

import { Table } from "antd";
import qs from "qs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "ID",
    sorter: (a, b) => a.id - b.id,
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "Title",
    dataIndex: "title",
    render: (name) => `${name}`,
    width: "30%",
  },
  {
    sorter: (a, b) => a.date - b.date,
    title: "Date",
    dataIndex: "date",
    width: "10%",
  },
  {
    title: "Category",
    dataIndex: "category",
    width: "10%",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: (record) => (
      <>
        <EditOutlined />
        <DeleteOutlined
          onClick={() => onDelete(record)}
          style={{ color: "red", marginLeft: "12px" }}
        />
      </>
    ),
    width: "10%",
  },
];

const onDelete = (record) => {
  console.log(record);
};
const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

class BlogDetails extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 8,
    },
    loading: false,
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });
    fetch(
      `http://localhost:5000/blogs?${qs.stringify(getRandomuserParams(params))}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          loading: false,
          data: data,
          pagination: {
            ...params.pagination,
            total: data.totalCount,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default BlogDetails;
