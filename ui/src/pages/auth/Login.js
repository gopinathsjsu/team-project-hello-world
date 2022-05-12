import React, { useState } from 'react';
import getLinks from '../../common/helper/links';
import API from '../../common/helper/api';
import { NavLink, Redirect, useHistory } from 'react-router-dom';

function Login() {
    let links = getLinks();
    let history = useHistory();
    const [loginError, setLoginError] = useState(null);
    const [formData, setFormData] = useState({
        email: 'jayam.thaker@gmail.com',
        password: 'a123',
    })

    function login(e) {
        e.preventDefault();
        let body = { ...formData }

        API({
            callURL: links.login,
            callMethod: "POST",
            bodyData: body,
            callBack: (res) => {
                if (res.status) {
                    localStorage.setItem("user", JSON.stringify(res.data.response.user));
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    // history.push({ pathname: '/hotels' });
                }
                else {
                    setLoginError(res.message);
                }

            }
        })
    }

    return (
        <>
            <form onSubmit={((e) => login(e))}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                {loginError !== null && <p>
                    <font color='red'>{loginError}</font>
                </p>}

                <button type="submit" className="btn btn-primary">Login</button>
                <NavLink to='/signup'>
                    Register
                </NavLink>
            </form>
        </>
    )
}

export default Login;