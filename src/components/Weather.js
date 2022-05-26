import axios from "axios";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  const options1 = {
    method: "GET",
    url: `http://api.weatherstack.com/current?access_key=e404b2705bee5d4f96578a3a9284d70e&query=kathmandu`,
  };

  const MINUTE_MS = 300000;

  useEffect(() => {
    axios
      .request(options1)
      .then(function (response) {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .request(options1)
        .then(function (response) {
          console.log(response.data);
          setWeather(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4>Weather status</h4>
      <MDBCard>
        <MDBCardBody style={{ textAlign: "left" }}>
          Location:{weather?.location.name}
          <br />
          Weather:
          <img
            style={{ width: "30px", borderRadius: "8px" }}
            src={weather?.current.weather_icons[0]}
            alt="weather"
          />
          {weather?.current.weather_descriptions[0]}
          <br />
          Temperature:
          <strong>
            <CountUp end={weather?.current.temperature} duration={3} />
            <span>&#8451;</span>
          </strong>
          <br />
          Wind speed:
          <strong>
            <CountUp end={weather?.current.wind_speed} duration={3} />
            <span> m/s</span>
          </strong>
          <br />
          Humidity:
          <strong>
            <CountUp end={weather?.current.humidity} duration={3} />%
          </strong>
          <br />
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default Weather;
