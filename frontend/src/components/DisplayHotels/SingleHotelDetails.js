import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import PassengerDetails from "../PassengerInformation/PassengerDetails";
import { useHistory } from "react-router";


const SingleHotelDetails = () => {
  const [hotelDetails, setHotelDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const history = useHistory();

  function passengerDetails() {
    const user = localStorage.getItem("user");
    if (user != null && user != undefined) {
      setUserDetails(JSON.parse(user));
      history.push("/travellerInfo");
    } else {
      history.push("/login");
    }
  }

  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:5000/flights/details/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setHotelDetails(data);
        localStorage.setItem("details", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {hotelDetails ? (
        <div className="single-hotel-details" style={{ marginTop: "5%" }}>
          <p style={{ fontSize: "2rem" }}>Travel Information</p>
          <p style={{ fontSize: "1.5rem", color: "purple" }}>
            Flights to be checked
          </p>
          <div className="hotel-details">
            <p style={{ fontSize: "1.5rem" }}>
              {}
              {hotelDetails.fromAirportCode} - {hotelDetails.toAirportCode}
            </p>
            <table>
              <tr>
                <th style={{ width: "8%" }}>FLIGHT</th>
                <th style={{ width: "25%" }}>FROM</th>
                <th style={{ width: "25%" }}>TO</th>
                <th style={{ width: "14%" }}>PRICE</th>
                <th style={{ width: "14%" }}>TAX</th>
                <th style={{ width: "14%" }}>TOTAL</th>
              </tr>
              <tr>
                <td style={{ fontSize: "1rem" }}>
                  <b>{hotelDetails.flightCode}</b>
                </td>
                <td style={{ fontSize: "1rem" }}>
                  <b></b>
                  <h4 style={{ fontSize: "1.2rem" }}>
                    {" "}
                    {hotelDetails.fromAirportCity} (
                    {hotelDetails.fromAirportCode})
                  </h4>
                  <small>{hotelDetails.fromAirportName}</small>
                </td>
                <td style={{ fontSize: "1rem" }}>
                  <b></b>
                  <h4 style={{ fontSize: "1.2rem" }}>
                    {hotelDetails.toAirportCity} ({hotelDetails.toAirportCode}
                    )
                  </h4>
                  <small>{hotelDetails.toAirportName}</small>
                </td>

                <td>
                  <h3 style={{ fontSize: "1.2rem" }}>
                    $ {hotelDetails.price}
                  </h3>
                </td>
                <td>
                  <h3 style={{ fontSize: "1.2rem" }}>$ {hotelDetails.tax}</h3>
                </td>
                <td>
                  <h3 style={{ fontSize: "1.2rem" }}>
                    ${(hotelDetails.price + hotelDetails.tax).toFixed(2)}
                  </h3>
                </td>
              </tr>
            </table>
          </div>

          <div className="manage-reservations" style={{ marginTop: "3%" }}>
            <Link to="/">
              <button id="cancel-search-button" style={{ marginLeft: "27%" }}>
                Cancel search
              </button>
            </Link>

            <button style={{ marginLeft: "1%" }} onClick={passengerDetails}>
              Book Flight
            </button>
          </div>

          {/* <div
            id="enter-passenger-info"
            style={{ marginTop: "15%", display: "none" }}
          >
            <PassengerDetails
              details={hotelDetails}
              userDetails={userDetails}
            />
          </div> */}
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

export default SingleHotelDetails;
