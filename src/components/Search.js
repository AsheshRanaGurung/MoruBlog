import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const Search = ({ searchValue, onInputChange, handleSearch }) => {
  //   const [searchValue, setSearchValue] = useState("");

  //   const loadBlogsData = async () => {
  //     const response = await axios.get("http://localhost:5000/blogs");
  //     console.log("if no event");
  //     console.log(response.data);
  //     // dispatch(getApiDataSuccess(response.data));
  //   };

  //   const onInputChange = (e) => {
  //     if (!e.target.value) {
  //       loadBlogsData();
  //     }
  //     setSearchValue(e.target.value);
  //   };

  //   const handleSearch = async (e) => {
  //     e.preventDefault();

  //     const response = await axios.get(
  //       `http://localhost:5000/blogs?q=${searchValue}`
  //     );
  //     if (response.status === 200) {
  //       console.log("if event is there");
  //       console.log(response.data);
  //     }
  //   };

  return (
    <div className="searchForm">
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          type="search"
          className="form-control"
          placeholder="Search Blog..."
          value={searchValue}
          onChange={(e) => onInputChange(e)}
        ></input>
        <Button
          type="submit"
          icon={<SearchOutlined />}
          size="large"
          onClick={handleSearch}
        />
      </form>
    </div>
  );
};

export default Search;
