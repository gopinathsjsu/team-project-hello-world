import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment-timezone";


const DisplayHotels = ({ flights: hotels }) => {
  const [depDate, setDepDate] = useState();
  const [depTime, setDepTime] = useState();
  const [arrDate, setArrDate] = useState();
  const [arrTime, setArrTime] = useState([]);
  function timeparser() {
    var dep = hotels[0]?.deptTime;
    var arr = hotels[0]?.arrTime;
    console.log(dep);

    var options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    var depDateFormat = moment
      .tz(dep, hotels[0]?.fromAirportTz)
      .format("dddd, MMM Do, YYYY");
    var depTimeFormat = moment.tz(dep, hotels[0]?.fromAirportTz).format("LT");
    var arrDateFormat = moment
      .tz(arr, hotels[0]?.toAirportTz)
      .format("dddd, MMM Do, YYYY");
    var arrTimeFormat = moment.tz(arr, hotels[0]?.toAirportTz).format("LT");
    setDepDate(depDateFormat);
    setDepTime(depTimeFormat);
    setArrDate(arrDateFormat);
    setArrTime(arrTimeFormat);
  }

  useEffect(() => {
    console.log(hotels);
    timeparser();
  }, []);

  return (
    <div>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/displayflights/${hotels[0]?.id}`}
      >
        <Card>
          <Card.Header
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div name="from">
              <h5>{hotels[0]?.fromAirportCode}</h5>
              <h6>{hotels[0]?.fromAirportCity}</h6>
              <br />
              <span>{depDate}</span>
              <br />
              <span>{depTime}</span>
              <br />
            </div>
            <div
              name="line"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h6 style={{ letterSpacing: "3px" }}>
                  {hotels[0]?.flightCode}
                </h6>
              </div>
              <small>──────────────────────────────────────────────</small>
            </div>
            <div name="to">
              <h5>{hotels[0]?.toAirportCode}</h5>
              <h6>{hotels[0]?.toAirportCity}</h6>
              <br />
              <span>{arrDate}</span>
              <br />
              <span>{arrTime}</span>
              <br />
            </div>
          </Card.Header>
        </Card>
      </Link>
    </div>
  );
};

export default DisplayHotels;
