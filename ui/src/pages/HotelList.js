import React, { useState, createContext, useContext } from "react";
import HotelCard from "../components/HotelCard";
import SearchBarHotels from "../components/SearchBarHotels";

const UserContext = createContext();

export default function HotelList() {
  return (
    <div className="container">
      <SearchBarHotels />
      <div className="row">
        <div className="hotel-card-container">
          {Array.from(Array(10).keys()).map((n) => (
            <HotelCard />
          ))}
        </div>
      </div>
    </div>
  );
}
