import React, { useState } from 'react';
import getLinks from '../../common/helper/links';
import API from '../../common/helper/api';
import { useHistory } from 'react-router-dom';

function Signup() {
    let links = getLinks();
    let history = useHistory();
    const [signupError, setSignupError] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        address: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        type: ''
    })

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
                    history.push({ pathname: '/login' });
                }
                else {
                    setSignupError(res.message);
                }

            }
        })
    }

    return (
        <>
            <form onSubmit={((e) => register(e))}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Zip Code</label>
                    <input type="text" className="form-control" id="zip" value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" id="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                </div>

                {signupError !== null && <p>
                    <font color='red'>{signupError}</font>
                </p>}
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <a href='/login'>
                    Login
                </a>
            </form>
        </>
    )
}

export default Signup;