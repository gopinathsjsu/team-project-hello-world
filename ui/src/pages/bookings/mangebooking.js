import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../common/helper/api';
import getLinks from '../../common/helper/links';
import useAuth from '../../common/helper/useAuth';
import Booking from './Each.Booking';

function Bookings() {
    let links = getLinks();
    const [bookings, setBookings] = useState([])
    const navigate = useNavigate();
    const auth = useAuth();

    if(!auth){
        navigate('/login');
    }

    console.log(auth);
    useEffect(() => {
        API({
            callURL: links.bookings,
            callMethod: "GET",
            headers: {
                'Authorization': `${auth.token}`
            },
            callBack: (res) => {
                if (res.status) {
                    setBookings(res.data);
                }
                else {
                    setBookings([]);
                }

            }
        })

    }, [])

    return (
        <div className='container d-flex flex-column justify-content-center p-4'>
            <h2>Manage Reservations</h2>
            {
                bookings.length > 0 ? <Booking bookings={bookings} setBookings={setBookings} /> :
                    <>Opps No bookings have been made</>
            }
        </div>
    )
}

export default Bookings;