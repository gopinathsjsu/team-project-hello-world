import React, { useState, useEffect } from "react";
import ReservationDetails from "./ReservationDetails";
import axios from "axios";
import { useHistory } from "react-router";

const MyReservations = () => {
  const [reservations, setReservations] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  async function cancelBooking() {
    const user = localStorage.getItem("user");
    const body = {
      userId: JSON.parse(user).id,
      flight: reservations.flight.id,
      pnr: reservations.pnr,
    };
    console.log({ body });
    try {
      const response = await axios.post(
        `http://localhost:5000/booking/cancel`,
        body
      );
      if (response.status === 200) {
        console.log(response.data);
        try {
          const res = await axios.get(
            `http:/localhost:5000/user/profile/${JSON.parse(user).id}`
          );
          console.log(res);
          if (res.status) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
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
    const pnr = queryParams.get("pnr");
    const params = pnr;

    console.log(params);
    axios
      .get(`http://localhost:5000/booking/${params}`)
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {reservations && <ReservationDetails reservations={reservations} />}

      {isLoggedIn && reservations?.status === "ACTIVE" && (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <button onClick={cancelBooking}>Cancel booking</button>
        </div>
      )}
    </div>
  );
};

export default MyReservations;
