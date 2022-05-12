import React, { useState } from "react";
import getLinks from "../../common/helper/links";
import API from "../../common/helper/api";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

function Login() {
  let links = getLinks();
  const [loginError, setLoginError] = useState(null);
  const [formData, setFormData] = useState({
    email: "jayam.thaker@gmail.com",
    password: "a123",
  });

  function login(e) {
    e.preventDefault();
    let body = { ...formData };

    API({
      callURL: links.login,
      callMethod: "POST",
      bodyData: body,
      callBack: (res) => {
        if (res.status) {
          localStorage.setItem("user", JSON.stringify(res.data.response.user));
          localStorage.setItem("token", JSON.stringify(res.data.token));
        } else {
          setLoginError(res.message);
        }
      },
    });
  }

  return (
    <div className="container">
      <div className="login-background">
        <form onSubmit={(e) => login(e)}>
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
                  <form className="mt-5">
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
                    Don't have an account?<a href="/signup">Sign Up</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div classNameName="mb-3">
                    <label classNameName="form-label">Email address</label>
                    <input type="email" classNameName="form-control" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div classNameName="mb-3">
                    <label classNameName="form-label">Password</label>
                    <input type="password" classNameName="form-control" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>

                <button type="submit" classNameName="btn btn-primary">Login</button>
                <NavLink to='/signup'>
                    Register
                </NavLink> */}
        </form>
      </div>
    </div>
  );
}

export default Login;
