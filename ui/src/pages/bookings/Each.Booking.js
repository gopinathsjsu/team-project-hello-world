import React from 'react';
import API from '../../common/helper/api';
import getLinks from '../../common/helper/links';

function Booking(props) {
    let links = getLinks();

    function cancel(id, index) {
        API({
            callURL: links.bookings + '/' + id,
            callMethod: "DELETE",
            callBack: (res) => {
                console.log(res);
                if (res.status) {
                    let temp = [...props.bookings];
                    temp[index].status = 'Cancel';
                    props.setBookings(temp);
                }
            }
        })
    }

    return (
        <ul className='list-group list-group-flush mt-2'>
            {
                props.bookings.map((item, index) => (

                    <li key={index} className='list-group-item d-flex flex-row justify-content-between mt-3 border-bottom-1 bd-green-200'>
                        <div className='col-5 d-flex flex-column justify-content-around'>
                            <h6>Reservation No.: {item.id}</h6>
                            <div className='d-flex flex-row justify-content-between'>
                                <p className='col-6 mb-0'>{item.username}</p>
                                <p className=' col-6 mb-0'>{item.hotelname}</p>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p className='col-6 mb-0'>Room type <span>{item.type}</span></p>
                            </div>
                            <p className='mb-0'>Price: $<span>{item.price}</span></p>
                            <p className='mb-0'>Status:<span>{item.status}</span></p>
                            <p className='mb-0'>Status:<span>{item.start_date}</span></p>
                            <p className='mb-0'>Status:<span>{item.end_date}</span></p>
                        </div>
                        <div className='col-3 d-flex flex-row justify-content-around align-items-center'>
                            <button type="button" class="btn btn-danger" onClick={() => cancel(item.id, index)}>Cancel</button>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default Booking;