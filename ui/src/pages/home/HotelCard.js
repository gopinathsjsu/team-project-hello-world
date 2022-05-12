import React from "react";
import hotelImage from "../../images/Hotel.webp";
import "../../styles/HotelList.css";


export default function HotelCard(props) {
  return (
    <div className="card shadow-lg" style={{ width: "24rem" }}>
      <img src={hotelImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          <span>{props.detail.name}</span> <span className="right">{props.detail.location}</span>
        </h5>
        <p className="card-text">
          {props.detail.address}
        </p>
        <a href="#" className="btn btn-primary btn-hover">
          Book Now
        </a>
      </div>
    </div>
  );
}
