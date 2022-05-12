import React from "react";
import hotelImage from "../images/Hotel.webp";
import "../styles/HotelList.css";
export default function HotelCard() {
  return (
     <div className="card shadow-lg" style={{ width: "24rem" }}>
      <img src={hotelImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          <span>Sahara Star</span> <span className="right">San Jose</span>
        </h5>
        <p className="card-text">
          2390 Harris Way, San Jose, CA 95131
          <br />
          11th May - 6th June
        </p>
        <a href="#" className="btn btn-primary btn-hover">
          Book Now
        </a>
      </div>
    </div>
  );
}
