import React, { useState, useEffect } from "react";
import ReservationDetails from "./ReservationDetails";
import axios from "axios";
import { useHistory } from "react-router";
import { get } from "../../utils/Api";

const MyBookings = () => {
  const [bookings, setBookings] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  async function cancelBooking() {
    const user = localStorage.getItem("user");
    
    const body = {
      booking_id: bookings.booking_id,
    };

    console.log({ body });
    try {
      let endpoint = "cancel/" + JSON.parse(user).id
      const response = await get({endpoint: endpoint})
      
      if (response.status === 200) {
        console.log(response.data);
        try {
          let url = "user/" + JSON.parse(user).id
          const res = await get({endpoint: url})
          console.log(res);
          if (res.status) {
            localStorage.setItem("user", JSON.stringify(res.data));
          } else {
            console.log(res);
          }
        } catch (error) {
          console.log(error.toString());
        }
        history.push("/userprofile");
      } else {
        console.log(response.data.message);
        return;
      }
    } catch (error) {
      return {
        status: 500,
        message: error.toString(),
      };
    }
  }
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null && user !== undefined) {
      setIsLoggedIn(true);
    }
    const queryParams = new URLSearchParams(window.location.search);
    const bookingId = queryParams.get("id");
    const params = bookingId;

    console.log(params);
    // axios
    //   .get(`http://localhost:5000/booking/${params}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setBookings(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let end = "booking/" + params
    const res = get({endpoints: end});
    setBookings(res.data)
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {bookings && <ReservationDetails reservations={bookings} />}

      {isLoggedIn && bookings?.status === "ACTIVE" && (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <button onClick={cancelBooking}>Cancel booking</button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
