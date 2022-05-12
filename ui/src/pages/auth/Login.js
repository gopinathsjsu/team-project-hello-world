import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })



    return (
        <>
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <NavLink to='/signup'>Sign Up</NavLink>
            </form>
        </>
    )
}

export default Login;