import React, { useEffect, useState } from "react";
import HotelList from "./HotelList";
import { Spinner } from "react-bootstrap";


const BookHotelsForm = () => {
  const [hotelList, sethotelList] = useState();
  const [isPending, setisPending] = useState(false);
  useEffect(() => {
    // Implement API and then run
    fetch("http://localhost:5000/hotels")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        sethotelList(data);
        setisPending(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isPending ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90vh",
              paddingTop: "100px",
              background: "#e8effa",
            }}
          >
            <div
              className="book-hotels-form"
              style={{ fontSize: "2rem", color: "purple", textAlign: "center" }}
            >
              Where would you like to stay?
            </div>
            <form action="/displayflights" method="get">
              <div
                style={{
                  display: "flex",
                  width: "100vw",
                  justifyContent: "center",
                }}
              >
                <div className="book-hotels-form">
                  <span>From</span>
                  {hotelList && (
                    <HotelList
                      value={hotelList}
                      title="departure-airport"
                    />
                  )}
                </div>
                <br />
                <div className="book-hotels-form">
                  <span>To</span>
                  <br />
                  {hotelList && (
                    <HotelList value={hotelList} title="arrival-airport" />
                  )}
                </div>
                <div className="date-form">
                  <label htmlFor="trip-start">Departure</label>
                  <br />
                  <input
                    type="date"
                    id="trip-start"
                    name="trip-start"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  ></input>
                </div>
                <div className="date-form">
                  <button className="search-hotels-button">
                    Search Flights
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <h3>Hotel Booking App</h3>
          {/*Set isPending to false and then change code*/}
          {/*<Spinner animation="border" variant="success" />*/}

        </div>
      )}
    </>
  );
};

export default BookHotelsForm;
