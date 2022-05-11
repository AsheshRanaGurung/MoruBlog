import React from "react";

const DownloadButton = () => {
  return (
    <div style={{ marginTop: "20px", width: "16rem" }}>
      <h4>Download Link</h4>
      <a href="https://bit.ly/2SMSQB2" target="_blank">
        <img
          src="https://moru.com.np/wp-content/uploads/2020/10/playstore.png"
          style={{ width: "165px" }}
        ></img>
      </a>
      <a href="https://apple.co/3lHSacu" target="_blank">
        <img
          src="https://moru.com.np/wp-content/uploads/2020/10/appstore.png"
          style={{ width: "165px", marginTop: "15px" }}
        ></img>
      </a>
    </div>
  );
};

export default DownloadButton;
