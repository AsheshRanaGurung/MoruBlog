import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import React from "react";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";

const DashboardLandingPage = () => {
  return (
    <div>
      DashboardLandingPage
      <MDBRow>
        <MDBCol>
          <PieChart />
        </MDBCol>
        <MDBCol lg={6}>
          <LineChart />
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default DashboardLandingPage;
