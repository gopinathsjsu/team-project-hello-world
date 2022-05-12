import React, { useState } from "react";
import getLinks from "../../common/helper/links";
import API from "../../common/helper/api";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
function Signup() {
  let links = getLinks();

  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    type: "",
  });

  function register(e) {
    e.preventDefault();

    let body = { ...formData };

    API({
      callURL: links.login,
      callMethod: "POST",
      bodyData: body,
      callBack: (res) => {
        if (res.status) {
          setSignupError(null);

          navigate("/login");
        } else {
          setSignupError(res.message);
        }
      },
    });
  }

  return (
    <div className="container">
      <div className="login-background">
        <form onSubmit={(e) => register(e)}>
          <div className="container">
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                <div className="card-header">
                  <h3>Register</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-12 col-lg-6">
                        {/* first name */}
                        <label className="form-label label-text">
                          First Name
                        </label>
                        <div className="input-group form-group">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="text"
                            id="email"
                            value={formData.first_name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                first_name: e.target.value,
                              })
                            }
                            className="form-control"
                            placeholder="first name"
                          />
                        </div>{" "}
                      </div>
                      <div className="col-sm-12 col-lg-6">
                        {/* last name */}
                        <label className="form-label label-text">
                          Last Name
                        </label>
                        <div className="input-group form-group">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                          <input
                            type="text"
                            id="last_name"
                            value={formData.last_name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                last_name: e.target.value,
                              })
                            }
                            className="form-control"
                            placeholder="last name"
                          />
                        </div>{" "}
                      </div>
                    </div>

                    {/* email */}

                    <label className="form-label label-text">Email</label>
                    <div className="input-group form-group">
                      <span className="input-group-text">
                        <i class="fa fa-solid fa-envelope"></i>
                      </span>
                      <input
                        placeholder="email"
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    {/* password */}

                    <label className="form-label label-text">Password</label>
                    <div className="input-group form-group">
                      <span className="input-group-text">
                        <i class="fa fa-solid fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="password"
                      />
                    </div>

                    {/* address */}

                    <label className="form-label label-text">Address</label>
                    <div className="input-group form-group">
                      <span className="input-group-text">
                        <i class="fa fa-solid fa-home"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="address"
                      />
                    </div>

                    <div className="row">
                      <div className="col-sm-12 col-lg-6">
                        {/* city */}
                        <div className="input-group form-group">
                          <span className="input-group-text">
                            <i class="fa fa-solid fa-home"></i>
                          </span>

                          <input
                            placeholder="city"
                            type="text"
                            className="form-control"
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-sm-12 col-lg-6">
                        {/* zip */}
                        <div className="input-group form-group">
                          <span className="input-group-text">
                            <i class="fa fa-solid fa-home"></i>
                          </span>

                          <input
                            type="number"
                            className="form-control"
                            id="zip"
                            value={formData.zip}
                            onChange={(e) =>
                              setFormData({ ...formData, zip: e.target.value })
                            }
                            placeholder="zip"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12 col-lg-6">
                        {/* state */}
                        <div className="input-group form-group">
                          <span className="input-group-text">
                            <i class="fa fa-solid fa-home"></i>
                          </span>

                          <input
                            placeholder="state"
                            type="text"
                            className="form-control"
                            id="state"
                            value={formData.state}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="col-sm-12 col-lg-6">
                        {/* country */}
                        <div className="input-group form-group">
                          <span className="input-group-text">
                            <i class="fa fa-solid fa-home"></i>
                          </span>

                          <input
                            placeholder="country"
                            type="text"
                            className="form-control"
                            id="country"
                            value={formData.country}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                country: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between links">
                    {signupError !== null && (
                      <p>
                        <font color="red">{signupError}</font>
                      </p>
                    )}
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                    <a href="/login">Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
