import axios from "axios";
import React, { useEffect } from "react";

const UserOverviewPage = () => {
  const getUserDetails = async () => {
    const response = await axios.get(
      `https://flaskapi-sanjeev.herokuapp.com/account/15`
    );
    console.log(response);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return <div>UserOverviewPage</div>;
};

export default UserOverviewPage;
