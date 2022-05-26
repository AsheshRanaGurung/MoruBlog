import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import axios from "axios";
import { Spin, Space } from "antd";
import Blogs from "./Blogs";
import PaginationThis from "./Pagination";
import { toast } from "react-toastify";

const AllBlogs = () => {
  const getData = useSelector((state) => state?.Blogs);
  const { blogs } = getData;

  const [searchValue, setSearchValue] = useState("");
  const [allblogs, setAllblogs] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const excerpt = (string) => {
    if (string.length > 60) {
      string = string.substring(0, 60) + "...";
    }
    return string;
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      setAllblogs(blogs);
      console.log("triggreed");
    }
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `http://localhost:5000/blogs?q=${searchValue}`
    );
    if (response?.status === 200) {
      console.log("Search successful");

      const filteredBlog = response?.data;
      setAllblogs(filteredBlog);
      // console.log(filteredBlog);
    }
  };
  //   const handleCategory = async (category) => {
  //     const response = await axios.get(
  //       `http://localhost:5000/blogs?category=${category}`
  //     );
  //     if (response.status === 200) {
  //       setAllblogs(response.data);
  //     } else {
  //       toast.error("Something went wrong!");
  //     }
  //     // console.log(category);
  //   };

  useEffect(() => {
    setAllblogs(blogs);
  }, [blogs]);

  //get curent posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = allblogs.slice(indexofFirstPost, indexOfLastPost);

  //changepage
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />
      <div className="LoginPage" style={{ paddingTop: "30px" }}>
        <>
          <MDBRow>
            {allblogs?.length === 0 && (
              <Spin size="large" style={{ display: "block" }} />
            )}
          </MDBRow>
          <MDBRow>
            {allblogs &&
              currentPosts?.map((item, index) => (
                <MDBCol key={index} md={4} style={{ paddingBottom: "32px" }}>
                  <Blogs
                    id={item.id}
                    title={item.title}
                    date={item.date}
                    category={item.category}
                    description={item.blog}
                    excerpt={excerpt}
                  />
                </MDBCol>
              ))}
          </MDBRow>
          <PaginationThis
            postsPerPage={postPerPage}
            totalPosts={allblogs.length}
            paginate={paginate}
          />
        </>
      </div>
    </>
  );
};

export default AllBlogs;
