import React from "react";

const DownloadButton = () => {
  return (
    <div
      style={{
        margin: "20px 0px",
        width: "16rem",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4>Download App</h4>
      <a href="https://bit.ly/2SMSQB2" target="_blank">
        <img
          src="https://moru.com.np/wp-content/uploads/2020/10/playstore.png"
          style={{ width: "125px" }}
        ></img>
      </a>
      <a href="https://apple.co/3lHSacu" target="_blank">
        <img
          src="https://moru.com.np/wp-content/uploads/2020/10/appstore.png"
          style={{ width: "125px", marginTop: "15px" }}
        ></img>
      </a>
    </div>
  );
};

export default DownloadButton;
