import React from "react";
import { Typography } from "antd";
const { Paragraph, Title } = Typography;

function StrategyPage() {
  return (
    <div className="LoginPage">
      <div className="pagecontainer">
        <Title level={2} style={{ color: "#c61e2e" }}>
          Strategic Objectives
        </Title>
        <Paragraph style={{ textAlign: "justify", marginBottom: "45px" }}>
          The company will partner with prominent financial institutions,
          massive public utility undertakings, contemporary and non-
          contemporary merchant groups and infinite private businesses, to
          develop not just a system, but an ecosystem.
        </Paragraph>
        <Paragraph>
          The company will facilitate its customer needs by delivering a
          reliable system of services in combination with the latest state of
          the art technologies and prudent international practices.
        </Paragraph>
      </div>
    </div>
  );
}

export default StrategyPage;
