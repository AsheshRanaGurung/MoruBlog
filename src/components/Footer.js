import React from "react";
import "./Footer.css";
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";

function Footer() {
  return (
    <div className="footer">
      <a href="#">
        <button className="top">Back to top</button>
      </a>
      <div className="Webcontainer">
        <MDBRow>
          <MDBCol md="3">
            <h5 className="title">BabaalDeal</h5>
            <p className="footer-intro">
              “BabaalDeal” is a full stack interactive B2C e-commerce providing
              users with a platform to buy and review the electronics related
              accessories online which will be built with reactjs for frontend,
              redux for state management, postgres for database and DjangoREST
              framework for backend.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="https://www.facebook.com/ashesh.ranagurung">
                  {" "}
                  facebook
                </a>
              </li>
              <li className="list-unstyled">
                <i className="fab fa-instagram"></i>
                <a href="https://www.instagram.com/asheshrana.gr"> Instagram</a>
              </li>
              <li className="list-unstyled">
                <i className="fab fa-github"></i>
                <a href="https://github.com/VeNom198"> Github</a>
              </li>
              <li className="list-unstyled">
                <i className="fab fa-linkedin-in"></i>
                <a href="#!"> Linkedin</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Policies</h5>
            <ul>
              <li className="list-unstyled">Terms & Conditions</li>
              <li className="list-unstyled">Privacy Policy</li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Contact Us</h5>
            <ul>
              <li className="list-unstyled">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                3rd Floor, Nirdhan Bhawan, Bhagwati Bahal, Naxal-1 Kathmandu,
                Nepal
              </li>{" "}
              <li className="list-unstyled">
                <i class="fa fa-phone" aria-hidden="true"></i> +977-1-4543888
              </li>
              <li className="list-unstyled">
                <i class="fa fa-phone" aria-hidden="true"></i>
                16600114888
              </li>
              <li className="list-unstyled">
                {" "}
                <i className="fas fa-envelope-open"></i> info@moru.com.np
              </li>
              <li className="list-unstyled">
                <i
                  className="fab fa-facebook"
                  style={{ marginLeft: "4px" }}
                ></i>
                <i
                  className="fab fa-instagram"
                  style={{ marginLeft: "4px" }}
                ></i>

                <i
                  className="fab fa-linkedin-in"
                  style={{ marginLeft: "4px" }}
                ></i>
                <i className="fab fa-twitter" style={{ marginLeft: "4px" }}></i>
                <i className="fab fa-youtube" style={{ marginLeft: "4px" }}></i>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>

        <div className="footer-copyright text-center py-3">
          <MDBContainer className="copyright" fluid>
            &copy; {new Date().getFullYear()} Copyright: Pay Nep Pvt. Ltd. | All
            RIghts Reserved
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}

export default Footer;
