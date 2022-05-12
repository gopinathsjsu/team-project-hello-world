import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { useHistory } from "react-router";
import { Navbar, Card, Col, Row, Spinner } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import moment from "moment";
import { get, post } from "../../utils/Api";

const UserProfile = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [userBookings, setUserBookings] = useState();

  const history = useHistory();
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserDetails(JSON.parse(user));
    } else {
      history.go(-1);
    }

    let endpoint = "user/getBooking/" + JSON.parse(user).id
    const resp = get({endpoint: endpoint});
    console.log(resp)
    setUserBookings(resp.userBookings);
  }, []);

  return (
    <>
      {userDetails ? (
        <>
          <div
            style={{
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
            }}
          >
            <h2 style={{ padding: "20px" }}><b>
              <em>
                Welcome to your profile, {userDetails.first_name} {userDetails.last_name}
              </em>
              </b>
            </h2>
          </div>
          {/* <hr style={{ margin: "0px" }} /> */}
          <Row
            style={{
              display: "flex",
              width: "100vw",
              margin: "0px",
              paddingTop: "5px",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Col>
              <Col className="miles-card" style={{ padding: "45px" }}>
                <h3>
                  <b><em>Loyalty Points</em> Member</b>
                </h3>

                <div style={{ paddingTop: "30px" }}>
                  <h4>
                    <em>{userDetails.layalty_points}</em>
                    <b>Total loyalty points</b>
                  </h4>
                </div>
                <div>
                  <p>
                    {`You still require ${
                      4000 - (userDetails.layalty_points ? userDetails.layalty_points : 0)
                    } to be a Prime Loyalty Member.`}
                  </p>
                </div>
              </Col>
              <Col className="userprofile-card">
                <b><h4>Profile</h4></b>
                <b><h6>Email</h6></b>
                <p>{userDetails.email}</p>
                <b><h6>Phone Number</h6></b>
                <p>{userDetails.phone_number}</p>
                <b><h6>Address</h6></b>
                <p>{`${userDetails.address}, ${userDetails.city}`}</p>
                <p>{`${userDetails.state}, ${userDetails.country}, ${userDetails.zip}`}</p>
              </Col>
            </Col>
            <Col>
              <Col className="user-bookings-card">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Previous bookings</h4>
                </div>
                {userBookings === null ||
                userBookings === undefined ||
                userBookings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "30px" }}>
                    {console.log({ userBookings })}
                    You have not booked any room yet.
                  </div>
                ) : (
                  <>
                    <div>
                      {console.log({ userBookings })}
                      {userBookings.map((item, index) => {
                        const isActive = item?.status !== "ACTIVE";
                        return (
                          <Card>
                            <Card.Header>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <em>{`Booking Id. ${item.id}`}</em>
                                {isActive && (
                                  <p
                                    style={{
                                      margin: 0,
                                      color: "red",
                                      fontSize: "0.7rem",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    CANCELLED
                                  </p>
                                )}
                              </div>
                            </Card.Header>
                            <Card.Body
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <div>
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      history.push(`/booking/?pnr=${item.id}`);
                                    }}
                                    style={{
                                      backgroundColor: "white",
                                      color: "blue",
                                      padding: "5px",
                                      margin: "0",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    <em>More Info</em>
                                  </Button>
                                </div>
                              </div>
                              <div>
                                {/* <div
                                  style={{
                                    color: "green",
                                    textAlign: "right",
                                    textDecoration: isActive
                                      ? "line-through"
                                      : "",
                                  }}
                                >{`+ ${item.milesEarned} points`}</div> */}
                                {/* <div
                                  style={{
                                    color: "red",
                                    textAlign: "right",
                                    textDecoration: isActive
                                      ? "line-through"
                                      : "",
                                  }}
                                >{`- ${item.milesUsed} miles`}</div> */}
                              </div>
                            </Card.Body>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                )}
              </Col>
            </Col>
          </Row>
        </>
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
export default UserProfile;
