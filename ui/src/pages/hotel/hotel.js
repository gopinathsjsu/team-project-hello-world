import React, { useState, useEffect } from "react";
import "../../styles/Hotel.css";
import API from '../../common/helper/api';
import getLinks from '../../common/helper/links';

import {useLocation, useParams} from "react-router-dom"
function Hotel(props) {
  const [roomType, setRoomType] = useState("");
  const [totalRooms, setTotalRooms] = useState(5);
  const [selectedRoomNum, setSelectedRoomNum] = useState(0);
  const [basePrice, setbasePrice] = useState(20);
  const [roomId,setRoomId] = useState(-1)
  const [roomTypes,setRoomTypes] = useState(["small", "medium"])
  const location = useLocation()

  let links = getLinks()
  console.log("data:")
  console.log(location)
  console.log("end")
  let selectedStyle = {
    backgroundImage:
      "linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%)",
  };
  console.log(selectedRoomNum);

  const calculateTotalPrice = () => basePrice * selectedRoomNum;
  const { hotelid } = useParams();
  const onBook = (e) =>{
    e.preventDefault();
    console.log({
      "start":location.state.startDate,
      "end":location.state.endDate,
      "room_type":roomId,
      "no_of_rooms":selectedRoomNum,
      "amenities": [],
    })
    API({
			callURL: links.book,
      bodyData: {
              "start":location.state.startDate,
              "end":location.state.endDate,
              "room_type":roomId,
              "no_of_rooms":selectedRoomNum,
              "amenities": [],
            },
			callMethod: "POST",
			callBack: (res) => {
				if (res.status) {
          alert("booked")
					console.log("done")
				}
				else {
					console.log(res)
				}
			}
		})

  }
  useEffect(() => {
    //let params = location.state
    console.log("HERE!!!!!!")
    let params = {
      "start": location.state.startDate,
      "end": location.state.endDate
    }
    console.log(params)

		API({
			callURL: links.rooms + `${hotelid}`,
      urlParams: params,
			callMethod: "GET",
			callBack: (res) => {
				if (res.status) {
					setRoomTypes(res.data)
				}
				else {
					
				}
			}
		})

	}, [])
  return (
    <div className="container">
      <div className="bg">
        <div className=" shadow-lg row book-card">
          <div className="row">
            <h1 className="mt-5">Select Room Type </h1>
            <hr></hr>
            <div className="room-type-container">
              {
              roomTypes.map((room, key) => {
                console.log("type:")
                console.log(room)
                return (
                  <button
                    onClick={(e) => {
                      setRoomType(e.target.value);
                      setbasePrice(room.price);
                      setTotalRooms(room.count+1)
                      setRoomId(room.id)
                    }}
                    style={roomType == room.name ? selectedStyle : null}
                    className="type-btn gradient-button gradient-button-1"
                    value={room.name}
                  >
                    {" "}
                    {room.name}
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
                    <button className="btn btn-primary" onClick={(e) => onBook(e)}> Book Now</button>
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
