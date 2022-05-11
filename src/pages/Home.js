// import { MDBCol, Row } from "antd";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import LatestBlog from "../components/LatestBlog";
import Category from "../components/Category";
import PaginationThis from "../components/Pagination";
import { toast } from "react-toastify";
import { Spin, Space } from "antd";
import DownloadButton from "../components/DownloadButton";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const getData = useSelector((state) => state?.Blogs);
  const { blogs } = getData;

  const [allblogs, setAllblogs] = useState(blogs);
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const options = [
    "National",
    "International",
    "Business",
    "Multimedia",
    "Sports",
  ];

  useEffect(() => {
    setAllblogs(blogs);
    fetchLatestBlog();
  }, [blogs]);

  const fetchLatestBlog = async () => {
    const totalBlog = await axios.get("http://localhost:5000/blogs");
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;

    const response = await axios.get(
      `http://localhost:5000/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      toast.error("Something went wrong!");
    }
  };
  // console.log(allblogs);
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

  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:5000/blogs?category=${category}`
    );
    if (response.status === 200) {
      setAllblogs(response.data);
    } else {
      toast.error("Something went wrong!");
    }
    console.log(category);
  };
  //get curent posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = allblogs.slice(indexofFirstPost, indexOfLastPost);

  //changepage
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="pagecontainer">
      {/* {JSON.stringify(allblogs)} */}
      {/* {JSON.stringify(filteredBlog)} */}

      <MDBRow>
        <MDBCol md="10">
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
                      <MDBCol
                        key={index}
                        // span={6}

                        style={{ paddingBottom: "32px" }}
                      >
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
              </>
              {/* )} */}
            </div>
          </>
        </MDBCol>
        <MDBCol md="2">
          <div style={{ marginTop: "40px" }}>
            <h4>Latest Blogs</h4>
            {latestBlog &&
              latestBlog.map((item, index) => (
                <LatestBlog key={index} {...item} />
              ))}{" "}
            <Category options={options} handleCategory={handleCategory} />
            <DownloadButton />
          </div>
        </MDBCol>
      </MDBRow>
      <PaginationThis
        postsPerPage={postPerPage}
        totalPosts={allblogs.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
