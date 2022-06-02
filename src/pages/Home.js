// import { MDBCol, Row } from "antd";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import LatestBlog from "../components/LatestBlog";
import Category from "../components/Category";
import PaginationThis from "../components/Pagination";
import { toast } from "react-toastify";
import { Spin, Button } from "antd";
import DownloadButton from "../components/DownloadButton";
import Weather from "../components/Weather";
import { getLatestDataSuccess } from "../redux/GetLatestBlog";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const getData = useSelector((state) => state?.Blogs);
  const { blogs } = getData;

  const [allblogs, setAllblogs] = useState(blogs);
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const [showBtn, setShowBtn] = useState(false);

  const dispatch = useDispatch();

  const showButton = () => {
    setShowBtn(true);
  };

  const hideButton = () => {
    setShowBtn(false);
    setAllblogs(blogs);
  };

  const options = [
    "Latest Offer",
    "Trending",
    "New Event",
    "Stories",
    "Careers",
  ];

  // useEffect(() => {
  //   setAllblogs(blogs);
  //   getUsers().then((data) => {
  //     setAllblogs();
  //   });
  //   // fetchLatestBlog();
  //   // return setAllblogs
  // }, [blogs]);

  useEffect(() => {
    setAllblogs(blogs);

    fetchLatestBlog();
  }, [blogs]);

  const fetchLatestBlog = async () => {
    const response = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/posts?page=1&perpage=4`
    );
    if (response.status === 200) {
      // setLatestBlog(response.data.posts);
      dispatch(getLatestDataSuccess(response.data.posts));
    } else {
      toast.error("Something went wrong!");
    }
  };
  // console.log(allblogs);
  const excerpt = (string) => {
    if (string?.length > 50) {
      string = string.substring(0, 50) + "...";
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
      `https://flaskapi-sanjeev.herokuapp.com/posts?category=${category.replace(
        /\s/g,
        ""
      )}`
    );
    if (response.status === 200) {
      setAllblogs(response.data.posts);

      showButton();
    } else {
      toast.error("Something went wrong!");
    }
    // console.log(category);
  };
  //get curent posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = allblogs.slice(indexofFirstPost, indexOfLastPost);

  //changepage
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pagecontainer">
      {/* {JSON.stringify(weather)} */}
      {/* {JSON.stringify(filteredBlog)} */}

      <MDBRow>
        <MDBCol>
          <>
            <div className="LoginPage" style={{ paddingTop: "30px" }}>
              <>
                <MDBRow>
                  <Search
                    searchValue={searchValue}
                    onInputChange={onInputChange}
                    handleSearch={handleSearch}
                  />
                  {allblogs?.length === 0 && (
                    <Spin size="large" style={{ display: "block" }} />
                  )}
                  {showBtn && (
                    <Button
                      style={{ marginBottom: "20px" }}
                      onClick={hideButton}
                      type="primary"
                    >
                      Go back
                    </Button>
                  )}
                  {allblogs &&
                    currentPosts?.map((item, index) => (
                      <MDBCol
                        key={index}
                        // lg={4}
                        md={6}
                        lg={4}
                        sm={12}
                        style={{ paddingBottom: "32px" }}
                      >
                        <Blogs
                          id={item.id}
                          title={item.title}
                          date={item.created_at}
                          // date={item.date}
                          category={item.category}
                          userIdWhoCreatedThisBLog={item.author.id}
                          description={item.content}
                          // description={item.blog}
                          excerpt={excerpt}
                        />
                      </MDBCol>
                    ))}
                  <PaginationThis
                    postsPerPage={postPerPage}
                    totalPosts={allblogs.length}
                    paginate={paginate}
                  />
                </MDBRow>
              </>
            </div>
          </>
        </MDBCol>
        <MDBCol xl={3}>
          <div style={{ marginTop: "40px" }}>
            <Weather />

            <Category options={options} handleCategory={handleCategory} />
            <DownloadButton />
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
