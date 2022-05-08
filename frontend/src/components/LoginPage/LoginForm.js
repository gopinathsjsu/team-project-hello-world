import React, { useState } from "react";
import { post } from "../../utils/Api";
import useForm from "./useForm";
import { Redirect, useHistory } from "react-router-dom";

const LoginForm = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });

  const history = useHistory();
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState();

  const checkLoginDetails = async (e) => {
    e.preventDefault();
    const response = await post({ endpoint: "user/login", body: values });
    if (response.status === 200 || response.status === 201) {
      // TODO: Write code for successful login redirection
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUserProfile(response.data.user);
      console.log("Login Response", response);
      history.go(-1);
    } else {
      console.log(response);
      setError(response.meesage.data.errors.message);
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <>
      {userProfile ? (
        <Redirect
          to={{
            pathname: "/userprofile",
            state: userProfile,
          }}
        />
      ) : (
        <div
          className="login"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <form onSubmit={checkLoginDetails}>
            <h4>Enter email</h4>
            <input
              type="email"
              name="email"
              className="signin-textbox"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              value={values.email}
              onChange={handleChange}
              required
            ></input>
            <div
              style={{
                height: "20px",
              }}
            ></div>
            <h4>Enter your password</h4>
            <input
              type="password"
              required
              name="password"
              className="signin-textbox"
              value={values.password}
              onChange={handleChange}
            ></input>
            <br />
            <div>
              <input
                type="submit"
                className="signin-submit-button"
                value="Login"
              ></input>
              <button onClick={(e) => goToRegister(e)}>Sign Up</button>
            </div>
          </form>
          {error !== "" && <p className="#error">{error}</p>}
        </div>
      )}
    </>
  );
};

export default LoginForm;
