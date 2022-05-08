import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SeatSelection from "./SeatSelection";
import { useHistory } from "react-router";

const userDetails = () => {
  // The parent component
  const [count, setCount] = useState(1); // Name it however you wish
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  const history = useHistory();

  useEffect(() => {
    // const user = localStorage.getItem("user");
    // const details = localStorage.getItem("details");
    // if (user != null && user != undefined) {
    //   setUserDetails(JSON.parse(user));
    //   setFlightDetails(JSON.parse())

    if (count >= 3) {
      document.getElementById("passenger-adder").disabled = true;
      document.getElementById("passenger-adder").style.cursor = "not-allowed";
    }
  }, [count]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setCount(count - 1);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setCount(count + 1);
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  function seatSelection() {
    for (let i = 0; i <= count - 1; i++) {
      if (inputList[i].firstName === "") {
        console.log("Enter the correct name in all selected fields");
        return;
      } else {
        localStorage.setItem("passengers", JSON.stringify(inputList));
        history.push("/seatSelection");
      }
    }
  }

  return (
    <div className="single-hotel-details" style={{ marginTop: "5%" }}>
      <h1>Enter your booking information</h1>

      {inputList.map((x, i) => {
        return (
          <div className="book-hotels-form">
            Passenger Name: <br />
            <br />
            <input
              name="firstName"
              placeholder="Enter Full Name"
              value={x.firstName}
              onInput={(e) => handleInputChange(e, i)}
              required
            />
            <br />
            <div className="btn-box" style={{ marginTop: "2%" }}>
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button
                  id="passenger-adder"
                  style={{ marginLeft: "2%" }}
                  onClick={handleAddClick}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: "5%" }}></div>

      <Link to="/displayflights" id="passenger-cancel-button">
        <button style={{ marginLeft: "20%" }}>Cancel search</button>
      </Link>
      <button style={{ marginLeft: "5%" }} onClick={seatSelection}>
        Proceed to Select Room for {count} guests
      </button>

      <div
        id="seat-selection-button"
        style={{ marginTop: "10%", display: "none" }}
      >
        {/* {details && (
          <SeatSelection
            details={details}
            passengers={JSON.stringify(inputList)}
            userDetails={userDetails}
          />
        )} */}
      </div>
    </div>
  );
};

export default userDetails;
