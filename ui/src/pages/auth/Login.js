import React, { useState } from "react";
import getLinks from "../../common/helper/links";
import API from "../../common/helper/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/Login.css";

function Login() {
  let links = getLinks();
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    email: "jayam.thaker@gmail.com",
    password: "a123",
  });

  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    let body = { ...formData };

    API({
      callURL: links.login,
      callMethod: "POST",
      bodyData: body,
      callBack: (res) => {
        console.log("Helllo")
        if (res.status) {
          localStorage.setItem("user", JSON.stringify({user: res.data.response.user, token: res.data.token }));
          console.log("HERE!!!")
          navigate("/hotels");
        } else {
          setLoginError(res.message);
          alert("Please enter valid username/password")
        }
      },
    });
  }

  return (
    <div className="container">
      <div className="login-background">
        <div className="container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-header">
                <h3>Sign In</h3>
                <div className="d-flex justify-content-end social_icon">
                  <span>
                    <i className="fab fa-facebook-square"></i>
                  </span>
                  <span>
                    <i className="fab fa-google-plus-square"></i>
                  </span>
                  <span>
                    <i className="fab fa-twitter-square"></i>
                  </span>
                </div>
              </div>
              <div className="card-body">
                <form className="mt-5" onSubmit={(e) => login(e)}>
                  <div className="input-group form-group">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="form-control"
                      placeholder="username"
                    />
                  </div>
                  <div className="input-group form-group">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Login"
                      className="btn float-right login_btn"
                    />
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-center links">
                  Don't have an account? <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
