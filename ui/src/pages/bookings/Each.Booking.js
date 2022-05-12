import React from "react";
import API from "../../common/helper/api";
import getLinks from "../../common/helper/links";
import "../../styles/Booking.css";

function Booking(props) {
  let links = getLinks();

  function cancel(id, index) {
    API({
      callURL: links.bookings + "/" + id,
      callMethod: "DELETE",
      callBack: (res) => {
        console.log(res);
        if (res.status) {
          let temp = [...props.bookings];
          temp[index].status = "Cancel";
          props.setBookings(temp);
        }
      },
    });
  }

  return (
    <div>
      {props.bookings.map((item, index) => (
        <div className="card shadow-lg" style={{ width: "80%" }}>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12 col-lg-6">
                <h3 className="mb-3">{item.hotelname}</h3>
                <div className="info-container">
                  <p>Room Type: {item.type} </p>
                  <hr></hr>
                  <p>Price: {item.price}</p>
                  <hr></hr>
                  <p>Status: {item.status} </p>
                  <hr></hr>
                  <p>Start Date: {item.start_date}</p>
                  <hr></hr>
                  <p>End Date: {item.end_date}</p>
                </div>
              </div>
              <div className="col-sm-12 col-lg-3"> </div>
              <div className="col-sm-12 col-lg-3">
                <button
                  onClick={() => cancel(item.id, index)}
                  className="btn btn-danger cancel-btn"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Booking;
