import React, { useState, useEffect } from "react";
import "../../styles/Hotel.css";
import API from '../../common/helper/api';
import getLinks from '../../common/helper/links';
import { useLocation } from "react-router-dom";

function Hotel(props) {
  const [roomType, setRoomType] = useState("");
  const [totalRooms, setTotalRooms] = useState(5);
  const [selectedRoomNum, setSelectedRoomNum] = useState(0);
  const [basePrice, setbasePrice] = useState(20);
  const [roomTypes, setRoomTypes] = useState(["small", "medium", "large", "suite"]);
  const location = useLocation();

  console.log("DATA:")
  console.log(location)
  console.log(location)
  
  let links = getLinks();
  useEffect(() => {
		API({
			callURL: links.rooms,
			callMethod: "GET",
			callBack: (res) => {
				if (res.status) {
					props.setRoomTypes(res.data);
				}
				else {
					props.setRoomTypes([]);
				}
			}
		})

	}, [])

  let selectedStyle = {
    backgroundImage:
      "linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%)",
  };
  console.log(selectedRoomNum);

  const calculateTotalPrice = () => basePrice * selectedRoomNum;

  return (
    <div className="container">
      <div className="bg">
        <div className=" shadow-lg row book-card">
          <div className="row">
            <h1 className="mt-5">Select Room Type </h1>
            <hr></hr>
            <div className="room-type-container">
              {roomTypes.map((room, key) => {
                return (
                  <button
                    onClick={(e) => {
                      setRoomType(e.target.value);
                    }}
                    style={roomType == room ? selectedStyle : null}
                    className="type-btn gradient-button gradient-button-1"
                    value={room}
                  >
                    {" "}
                    {room}
                  </button>
                );
              })}
            </div>
          </div>

          {roomType != "" && (
            <div className="row">
              <h1 className="mt-5">
                {" "}
                Select Number of Rooms for the {roomType} room
                <hr></hr>
              </h1>
              <div className="price-container">
                <div className="row">
                  <div className="col-sm-12 col-lg-3">
                    <div class="input-group input-group-lg">
                      <span class="input-group-text">Base Price</span>
                      <input
                        class="form-control"
                        aria-label="With textarea"
                        type="number"
                        disabled
                        value={basePrice}
                      ></input>
                    </div>
                  </div>

                  <div className="col-sm-12 col-lg-3">
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      placeholder="selected number of rooms"
                      onChange={(e) => setSelectedRoomNum(e.target.value)}
                    >
                      {/* <option selected>Select number of rooms</option> */}
                      {Array.from(Array(totalRooms).keys()).map((num, key) => (
                        <option value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mt-5">
                  <span>
                    {" "}
                    <h4>
                      {" "}
                      Your total payable amount is ${calculateTotalPrice()}{" "}
                    </h4>
                  </span>

                  <div className="col-sm-12 col-lg-3 mt-3">
                    <button className="btn btn-primary"> Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hotel;
