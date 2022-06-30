import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import { toast } from "react-toastify";
import { Button, Pagination } from "antd";
import DownloadButton from "../components/DownloadButton";
import Weather from "../components/Weather";
import Carousel from "../components/Carousel";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const getData = useSelector((state) => state?.Blogs);
  const { blogs } = getData;

  const [allblogs, setAllblogs] = useState(blogs);
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const pageSize = 6;

  const handleChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  const [showBtn, setShowBtn] = useState(false);

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

  useEffect(() => {
    setAllblogs(blogs);
    setTotalPage(blogs?.length / pageSize);
    setMaxIndex(pageSize);
  }, [blogs]);

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

    await axios
      .get(`https://flaskapi-sanjeev.herokuapp.com/posts?search=${searchValue}`)
      .then((res) => {
        if (res?.data?.posts.length === 0) {
          toast.info("No search found");
        } else {
          setAllblogs(res?.data?.posts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategory = async (category) => {
    await axios
      .get(
        `https://flaskapi-sanjeev.herokuapp.com/posts?category=${category.replace(
          /\s/g,
          ""
        )}`
      )
      .then((res) => {
        setAllblogs(res.data.posts);
        showButton();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="pagecontainer">
      <MDBRow>
        <MDBCol>
          <>
            <div className="LoginPage" style={{ paddingTop: "15px" }}>
              <>
                <MDBRow>
                  <Search
                    searchValue={searchValue}
                    onInputChange={onInputChange}
                    handleSearch={handleSearch}
                  />
                  <Carousel />

                  {showBtn && (
                    <Button
                      style={{ marginBottom: "20px" }}
                      onClick={hideButton}
                      type="primary"
                    >
                      Go back
                    </Button>
                  )}
                  {allblogs?.length === 0 && (
                    // <Spin size="large" style={{ display: "block" }} />
                    <p>No data</p>
                  )}

                  {allblogs?.slice(3).map(
                    (item, index) =>
                      index >= minIndex &&
                      index < maxIndex && (
                        <MDBCol
                          key={index}
                          md={6}
                          lg={4}
                          sm={12}
                          style={{ paddingBottom: "32px" }}
                        >
                          <Blogs
                            id={item.id}
                            title={item.title}
                            date={item.created_at}
                            category={item.category}
                            userIdWhoCreatedThisBLog={item.author.id}
                            description={item.content}
                            image={item.image}
                            excerpt={excerpt}
                          />
                        </MDBCol>
                      )
                  )}

                  <Pagination
                    pageSize={pageSize}
                    current={current}
                    onChange={handleChange}
                    total={allblogs.slice(3).length}
                    style={{ marginBottom: "20px" }}
                  />
                </MDBRow>
              </>
            </div>
          </>
        </MDBCol>
        <MDBCol xl={3}>
          <div style={{ marginTop: "30px" }}>
            {/* <Weather /> */}

            <Category options={options} handleCategory={handleCategory} />
            <DownloadButton />
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
