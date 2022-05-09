import React from "react";
import { Pagination } from "antd";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";

const PaginationThis = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    // <div style={{ marginBottom: "20px" }}>
    //   <Pagination defaultCurrent={1} total={500} />
    // </div>
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationThis;
