import React, { useEffect, useState } from "react";
import { Col, Container, Spinner, Button, Row, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SeatPicker from "react-seat-picker";
import { cc_format } from "../../utils/Validations";

const SeatSelection = () => {
  // function paymentInfo() {
  //   document.getElementById("seat-cancel-button").style.visibility = "hidden";
  //   document.getElementById("payment-info").style.display = "block";
  // }

  const [details, setDetails] = useState();
  const [userDetails, setUserDetails] = useState();
  const [rooms, setRooms] = useState();
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [rows, setRows] = useState([]);
  const [roomsSelected, setRoomsSelected] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const userTracker = [];
  const [creditCard, setCreditCard] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const addSeatCallback = ({ row, number, id }, addCb) => {
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    const newTooltip = `tooltip for id-${id} added by callback`;
    addCb(row, number, id, newTooltip);
    let temp = roomsSelected;
    temp.push(id);
    setRoomsSelected(temp);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    // A value of null will reset the tooltip to the original while '' will hide the tooltip
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    removeCb(row, number, newTooltip);
    let temp = roomsSelected;
    temp.splice(temp.indexOf(id), 1);
    setRoomsSelected(temp);
  };
  useEffect(() => {
    const details = localStorage.getItem("details");
    const userDetails = localStorage.getItem("user");
    const rooms = localStorage.getItem("passengers");
    console.log(rooms);
    console.log(details);
    const parsedDetails = JSON.parse(details);

    if (userDetails != null && userDetails != undefined) {
      setUserDetails(JSON.parse(userDetails));
      setRooms(JSON.parse(rooms));
      setDetails(JSON.parse(details));
    }
    if (parsedDetails?.seats) {
      let rowNum = 1;
      let temp = [];
      console.log(parsedDetails.seats.seatMap);
      for (let seat of Object.keys(parsedDetails.seats.seatMap)) {
        temp.push({
          id: seat,
          number: seat,
          tooltip: `$ ${parsedDetails.price}`,
          isSelected: false,
          isReserved: parsedDetails.seats.seatMap[seat].userId !== "",
        });
        if (rowNum % 2 === 0 && rowNum % 6 !== 0) {
          temp.push(null);
        }
        if (rowNum % 6 === 0) {
          let prevRows = rows;
          prevRows.push(temp);
          setRows(prevRows);
          temp = [];
        }
        rowNum++;
      }
    }
    console.log(JSON.stringify(rows));
    setShowSeatSelection(true);
  }, []);

  async function createBooking() {
    if (creditCard.length !== 19) {
      setError("credit");
      return false;
    } else if (name.length === 0) {
      setError("name");
      return false;
    }
    setError("");
    const seatInformation = [];
    for (let i = 0; i < roomsSelected.length; i++) {
      seatInformation.push({
        seatNo: roomsSelected[i],
        passengerName: userTracker[i],
      });
    }
    console.log(userTracker);

    console.log(seatInformation);
    const body = {
      userId: userDetails.id,
      flight: details.id,
      milesUsed: loyaltyPoints,
      seats: seatInformation,
    };
    console.log(body);
    if (roomsSelected.length == rooms.length) {
      try {
        const response = await axios.post(
          `http://krishnagupta.live:5000/booking/create`,
          body
        );
        console.log(response);
        if (response.status) {
          console.log(response.status);
          try {
            const res = await axios.get(
              `http://krishnagupta.live:5000/user/profile/${userDetails.id}`
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
          history.push(`/booking?pnr=${response.data.pnr}`);
          return response.data.data;
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
    } else {
      alert("Please choose the correct number of seats");
    }
  }
  const formatCreditCard = (e) => {
    let card = cc_format(e.target.value);
    setCreditCard(card);
  };

  return (
    <>
      {showSeatSelection ? (
        <div
          style={{
            margin: "0px",
            padding: "0px",
            width: "98vw",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Row>
            <Col xs={5}>
              <Container
                style={{ width: "100%", marginLeft: "2rem", marginTop: "5rem" }}
              >
                <h2>Your entered traveller information:</h2>
                <br />
                {rooms.map((passenger) => (
                  <div key={passenger.firstName}>
                    Passenger {userTracker.push(passenger.firstName)}:
                    <b> {passenger.firstName}</b>
                    <br />
                    <br />
                  </div>
                ))}
                <br />
                <h3>Enter payment information:</h3>
                <br />
                <div className="book-hotels-form">
                  <input
                    type="tel"
                    placeholder="Enter your card number"
                    value={creditCard}
                    onChange={(e) => formatCreditCard(e)}
                    required
                  ></input>
                  {error === "credit" ? (
                    <p style={{ color: "red", fontSize: "0.8rem" }}>
                      Enter a valid card number
                    </p>
                  ) : (
                    <>
                      <br />
                      <br />
                    </>
                  )}

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                  {error === "name" ? (
                    <p style={{ color: "red", fontSize: "0.8rem" }}>
                      Enter a valid name
                    </p>
                  ) : (
                    <>
                      <br />
                      <br />
                    </>
                  )}

                  <div class="slidecontainer">
                    <input
                      type="range"
                      min="0"
                      max={userDetails ? userDetails.miles : 100}
                      step="1"
                      defaultValue={loyaltyPoints}
                      onChange={(e) => setLoyaltyPoints(e.target.value)}
                    />
                    <p>
                      Total Miles available are:{" "}
                      <span id="demo">{userDetails?.miles}</span>
                    </p>
                    <p>
                      Miles to be used: <span id="demo">{loyaltyPoints}</span>
                    </p>
                  </div>
                  <div></div>
                </div>

                <Button
                  variant="secondary"
                  style={{ alignSelf: "center" }}
                  onClick={(e) => {
                    e.preventDefault();
                    createBooking();
                  }}
                >
                  Confirm Booking
                </Button>
              </Container>
            </Col>
            <Col xs={3}>
              <Container style={{ marginTop: "5%" }}>
                <div style={{ overflowY: "scroll", height: "85vh" }}>
                  <SeatPicker
                    addSeatCallback={addSeatCallback}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    maxReservableSeats={rooms.length}
                    visible
                    selectedByDefault
                  />
                </div>
              </Container>
            </Col>
            <Col xs={4} style={{ display: "flex", justifyContent: "center" }}>
              <Card
                style={{
                  height: "60vh",
                  width: "20vw",
                  alignSelf: "center",
                  opacity: 0.9,
                }}
              >
                <Card.Header>
                  <h6 className="display-6">Trip Cost</h6>
                </Card.Header>
                <Card.Body>
                  <Container
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Flight Cost</p>
                      </div>
                      <div>
                        <p>${details?.price}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Tax</p>
                      </div>
                      <div>
                        <p>${details?.tax}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Cost</p>
                      </div>
                      <div>
                        <p>${details?.price + details?.tax}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Passengers</p>
                      </div>
                      <div>
                        <p>x {rooms.length}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Total</p>
                      </div>
                      <div>
                        <p>
                          ${(details?.price + details?.tax) * rooms.length}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Miles Discount</p>
                      </div>
                      <div>
                        <p>- ${(loyaltyPoints * 0.093).toFixed(2)}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>Amount</p>
                      </div>
                      <div>
                        <p>
                          $
                          {(
                            (details?.price + details?.tax) *
                              rooms.length -
                            loyaltyPoints * 0.093
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Spinner animation="border" variant="success" />
        </div>
      )}
    </>
  );
};

export default SeatSelection;
