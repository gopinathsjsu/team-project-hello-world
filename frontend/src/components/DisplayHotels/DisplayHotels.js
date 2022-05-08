import React, { useState, useEffect } from "react";
import HotelInformation from "./HotelInformation";
import { useHistory } from "react-router";
import { Spinner } from "react-bootstrap";
import moment from "moment";

const DisplayHotels = () => {
  const [hotels, setHotels] = useState();
  // console.log(hotels ? hotels[0] : hotels);
  const history = useHistory();
  const [isPending, setisPending] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const date = queryParams.get("trip-start");
    const depAirport = queryParams.get("departure-airport");
    const arrAirport = queryParams.get("arrival-airport");
    console.log(date, depAirport, arrAirport); // 55 test null
    let params = {
      from: depAirport,
      to: arrAirport,
      deptTime: moment(date).format("YYYY-MM-DD"),
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    let url = "http://krishnagupta.live:5000/flights?" + query;

    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 404) {
          alert("No Hotels are available right now. Try some other time.");
          history.push("/");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setHotels(data.flights);
        setisPending(true);
        // console.log(hotels)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {isPending ? (
        <div style={{ background: "#e8effa", height: "100vh" }}>
          <div style={{ padding: "30px" }}>
            {hotels && (
              <h1>
                Showing flights from {hotels[0]?.fromAirportCity} to{" "}
                {hotels[0]?.toAirportCity}
              </h1>
            )}
          </div>
          <div>
            {hotels &&
              hotels.map((flight, index) => {
                return (
                  <div style={{ margin: "20px" }} key={index}>
                    {hotels && <HotelInformation flights={[flight]} />}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </>
  );
};

export default DisplayHotels;
