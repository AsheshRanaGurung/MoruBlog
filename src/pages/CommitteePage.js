import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

function CommitteePage() {
  return (
    <div className="LoginPage">
      <div className="pagecontainer">
        <Title level={2} style={{ color: "#c61e2e" }}>
          Committees Formed by board
        </Title>
        <div>
          <ul>
            <li style={{ display: "flex", fontSize: "24px" }}>
              AUDIT AND RISK COMMITTEE
            </li>
            <li style={{ display: "flex", fontSize: "24px" }}>
              {" "}
              DISPUTE RESOLUTION AND GRIEVANCE REHEARSAL COMMITTEE
            </li>
            <li style={{ display: "flex", fontSize: "24px" }}>
              INDUSTRY RELATIONS COMMITTEE
            </li>
            <li style={{ display: "flex", fontSize: "24px" }}>
              DIGITAL SECURITY COMMITTEE
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommitteePage;
