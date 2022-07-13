import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="LoginPage">
      <div>
        <Link to="/">
          <img
            style={{ width: "90%", height: "auto" }}
            src="https://partypropz.com/wp-content/uploads/2019/08/CodePen-404-Page.gif"
            alt="not found images"
            margin="auto"
          ></img>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
