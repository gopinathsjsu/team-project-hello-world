import React, { useState } from "react";
import useForm from "./useForm";
import { post } from "../../utils/Api";
import { Redirect, useHistory } from "react-router";
import { formatPhoneNumber } from "../../utils/Validations";

const SignInForm = () => {
  const [values, handleChange] = useForm({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    role: "user",
  });

  const history = useHistory();
  const [error, setError] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await post({ endpoint: "user/register", body: values });
    if (response.status == 200 || response.status == 201) {
      // TODO: Write code for successful login redirection
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response);
      history.replace("/");
    } else {
      console.log(response);
      setError(response.meesage.data.errors.message);
    }
  };
  const formatPhoneNum = (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
    handleChange(e);
  };
  return (
    <>
      {localStorage.getItem("user") ? (
        <Redirect to="/userprofile"></Redirect>
      ) : (
        <div className="signin">
          <form action="2.js" onSubmit={registerUser}>
            <h1>Personal Information</h1>
            <p>
              Your name, date of birth and gender should match the
              government-issued ID that you show at the airport.
            </p>
            <div style={{ display: "flex" }}>
              <div>
                <h5>First Name *</h5>
                <input
                  type="text"
                  className="signin-textbox"
                  maxLength="15"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  required
                  autoFocus
                ></input>
              </div>
              <div>
                <h5>Last Name *</h5>
                <input
                  type="text"
                  maxLength="15"
                  className="signin-textbox"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <div>
                <h5>Enter Email *</h5>
                <input
                  type="email"
                  name="email"
                  className="signin-textbox"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  value={values.email}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div>
                <h5>Enter Password *</h5>
                <input
                  type="password"
                  required
                  name="password"
                  className="signin-textbox"
                  minLength="8"
                  value={values.password}
                  onChange={handleChange}
                  value={values.password}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <br />
            <h5>Enter Phone Number *</h5>
            <input
              type="tel"
              id="phone"
              name="phoneNumber"
              className="signin-textbox"
              placeholder="(123) 456 678"
              required
              maxLength={12}
              value={values.phoneNumber}
              onChange={(e) => formatPhoneNum(e)}
            ></input>
            <br />
            <br />
            <h5>Enter Your Address</h5>
            <div style={{ display: "flex" }}>
              <div>
                <h6>Street *</h6>
                <input
                  name="address"
                  type="text"
                  className="signin-textbox"
                  required
                  value={values.address}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <h6>City *</h6>
                <input
                  name="city"
                  type="text"
                  className="signin-textbox"
                  required
                  value={values.city}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <div>
                <h6>State *</h6>
                <input
                  name="state"
                  type="text"
                  className="signin-textbox"
                  required
                  value={values.state}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <h6>Country *</h6>
                <input
                  type="text"
                  name="country"
                  className="signin-textbox"
                  required
                  value={values.country}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <br />
            <h6>ZipCode *</h6>
            <input
              type="tel"
              className="signin-textbox"
              name="zip"
              maxLength="5"
              minLength="4"
              required
              value={values.zip}
              onChange={handleChange}
            ></input>
            <br />
            <br />
            <input
              type="checkbox"
              id="miles"
              name="miles"
              style={{ marginRight: "10px" }}
              required
            ></input>
            <label htmlFor="miles">Subscribe to MileagePlus® account</label>
            <br />
            <input type="submit" className="signin-submit-button"></input>
          </form>
        </div>
      )}
    </>
  );
};

export default SignInForm;
