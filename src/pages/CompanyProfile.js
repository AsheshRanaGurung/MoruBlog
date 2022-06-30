import React from "react";
import { Typography } from "antd";
const { Paragraph, Title } = Typography;

function CompanyProfile() {
  return (
    <div className="LoginPage">
      <div className="pagecontainer">
        <Title level={2} style={{ display: "flex", color: "#c61e2e" }}>
          Company Profile
        </Title>
        <Paragraph
          style={{
            textAlign: "justify",
            // animationName: "fadeInRight",
            // animationDuration: "2.5s",
          }}
        >
          Pay Nep Private Limited, came into existence as the sixth Payment
          Service Provider of Nepal by receiving its operating License from
          Nepal Rastra Bank on Shrawan 15, 2076 B.S (August 1, 2019) with an
          objective of creating a unified aggregated payment platform that
          brings exercisable financial power to the hands of all Nepali, in
          spite of any all cultural, regional and educational background. Pay
          Nep sets to provide An easy to use digital wallet, for all people to
          exercise their financial power directly from their hands. An open
          ended API based integration system, for all BFIs and Payment
          Platforms, to eliminate the need for the users to physically visit any
          branch, to receive the banking facilities, and transact. An easy to
          integrate API based aggregator, for all Merchants/ Merchant groups, to
          have a digital solution both for operations and transactions. With the
          diverse academia and experience of its founders, Pay Nep Private
          Limited believes that it can recognize the problems associated with
          the trade, and the economy as a whole, with an insightful approach to
          address and solve it. The key focus of the company is always centered
          on serving unfulfilled needs of all users by offering swift and modern
          technology-driven payment products and services, thereby leaving the
          impression as an institution truly committed to enhancing user
          satisfaction, convenience and value. Capital Structure: Authorized
          Capital NPR 100,000,000.00/ Paid Up Capital NPR 60,000,000.00
        </Paragraph>
        <Title
          type="danger"
          level={2}
          style={{ display: "flex", color: "#c61e2e" }}
        >
          Vision Statement
        </Title>

        <Paragraph style={{ textAlign: "justify" }}>
          Our Vision is to be the most trusted and user friendly digital payment
          partner, across Nepal and become a household name for mobile rupee
          with Moru Digital Wallet, across all geopolitical and socioeconomic
          segments creating values for all, in trade as well as in wellbeing.
        </Paragraph>

        <Title
          type="danger"
          level={2}
          style={{ display: "flex", color: "#c61e2e" }}
        >
          Mission Statement
        </Title>

        <Paragraph style={{ textAlign: "justify" }}>
          Our mission is to be the leading payment service provider, delivering
          world class service through the blending of state-of-the-art
          technology and visionary management in partnership with competent and
          committed staff, to achieve reliable system of services to all with
          sustainable value addition to all our stakeholders. We are committed
          to do this mission while ensuring the highest levels of ethical
          standards, transparency, professional integrity, corporate governance
          and regulatory compliance.
        </Paragraph>
      </div>
    </div>
  );
}

export default CompanyProfile;
