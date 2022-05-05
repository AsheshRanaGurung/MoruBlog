// import { MDBCol, Row } from "antd";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Blogs from "../components/Blogs";
import Search from "../components/Search";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const getData = useSelector((state) => state?.Blogs);
  const { blogs, isLoading } = getData;

  const [allblogs, setAllblogs] = useState(blogs);
  // console.log(allblogs);

  useEffect(() => {
    setAllblogs(blogs);
  }, [blogs]);

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

  const loadBlogsData = async () => {
    const response = await axios.get("http://localhost:5000/blogs");
    console.log("search bar empty");
    console.log(response.data);
    // dispatch(getApiDataSuccess(response.data));
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

  return (
    <div className="pagecontainer">
      {/* {JSON.stringify(allblogs)} */}
      {/* {JSON.stringify(filteredBlog)} */}
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={handleSearch}
      />

      {
        <div className="LoginPage">
          {/* {filteredBlog ? (
            <>
              <MDBRow>{filteredBlog.length === 0 && <p>Loading...</p>}</MDBRow>
              <MDBRow gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {filteredBlog &&
                  filteredBlog.map((item, index) => (
                    <MDBCol key={index} style={{ paddingBottom: "32px" }}>
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
          ) : ( */}
          <>
            <MDBRow>{allblogs?.length === 0 && <p>Loading...</p>}</MDBRow>
            <MDBRow>
              {allblogs &&
                allblogs?.map((item, index) => (
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
      }
    </div>
  );
};

export default Home;
