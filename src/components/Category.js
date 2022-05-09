import { MDBCard, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import React from "react";

const Category = ({ options, handleCategory }) => {
  return (
    <div>
      <MDBCard style={{ width: "16rem", marginTop: "20px" }}>
        <h4>Category</h4>
        <MDBListGroup flush>
          {options.map((item, index) => (
            <MDBListGroupItem
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => handleCategory(item)}
            >
              {item}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </MDBCard>
    </div>
  );
};

export default Category;
