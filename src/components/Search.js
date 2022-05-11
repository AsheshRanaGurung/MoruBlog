import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Search = ({ searchValue, onInputChange, handleSearch }) => {
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
