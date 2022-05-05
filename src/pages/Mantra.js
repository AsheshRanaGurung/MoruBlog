import React from "react";
import { Typography } from "antd";
const { Paragraph, Title } = Typography;
function Mantra() {
  return (
    <div className="LoginPage">
      <div className="pagecontainer">
        {/* <Switch
      // checked={ellipsis}
      // onChange={() => {
      //   setEllipsis(!ellipsis);
      // }}
    /> */}

        <Title level={2} style={{ color: "#c61e2e" }}>
          Power To the People
        </Title>
        <Paragraph style={{ textAlign: "justify" }}>
          At PNPL, we are keen to unleash the potential of general public,
          giving shape to their ideas and digital presence to their trade. We
          aspire to provide easy access to insurance, investment and credit to
          people, and thus give more financial power and freedom to the people.
          Users will always be our first priority in all matters we indulge in.
          We aspire to gain user’s confidence and be their trusted partner. We
          shall without discrimination cater to the needs of all our users.
        </Paragraph>
      </div>
    </div>
  );
}

export default Mantra;
