import React from "react";

const FindReservations = () => {
  return (
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
        Search Booking
      </div>
      <form action="/booking">
        <div
          style={{
            display: "flex",
            width: "100vw",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Booking Id"
              name="pnr"
              style={{ height: "100%", width: "20rem" }}
              required
              autofocus
            ></input>
          </div>
          <div style={{ width: "20px" }}></div>
          <div>
            <button type="submit" style={{ textAlign: "center" }}>
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FindReservations;
