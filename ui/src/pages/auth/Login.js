import React, { useState } from 'react';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function login(e) {
        e.preventDefault();
        let body = { ...formData }
        console.log(formData);
    }

    return (
        <>
            <form onSubmit={((e) => login(e))}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                <a href='/signup'>
                    Register
                </a>
            </form>
        </>
    )
}

export default Login;