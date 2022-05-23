import React from "react";
import { Typography } from "antd";
const { Paragraph, Title } = Typography;

function Governance() {
  return (
    <div className="LoginPage">
      <div className="pagecontainer">
        <Title level={2} style={{ color: "#c61e2e" }}>
          Corporate Governance
        </Title>
        <Paragraph style={{ textAlign: "justify" }}>
          At Pay Nep Private Limited, we are firmly committed to the highest
          standards of governance. The Board of Directors ensures that the
          activities of the Company are always conducted with the highest
          standards and in the best interests of its stakeholders, with several
          committees made out of founders with relevant experiences. The Board
          of Directors continues to ensure that the Company conducts itself as a
          model corporate citizen by specifying corporate values for the Bank
          and stipulating a code of Conduct and Ethics for the employees to
          ensure that the employees maintain their dignity and integrity and
          build public confidence.
        </Paragraph>
        <Paragraph style={{ textAlign: "justify", marginBottom: "90px" }}>
          The Company has adopted good corporate governance practices prescribed
          by the Nepal Rastra Bank as well as other relevant statues such as
          Companies Act 2006.
        </Paragraph>
      </div>
    </div>
  );
}

export default Governance;
