import React, { useState } from 'react';
import getLinks from '../../common/helper/links';
import API from '../../common/helper/api';

function Login() {
    let links = getLinks();
    const [loginError, setLoginError] = useState(null);
    const [formData, setFormData] = useState({
        email: 'jayam.thaker@gmal.com',
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
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                {loginError !== null && <p>
                    <font color='red'>{loginError}</font>
                </p>}

                <button type="submit" className="btn btn-primary">Login</button>
                <a href='/signup'>
                    Register
                </a>
            </form>
        </>
    )
}

export default Login;