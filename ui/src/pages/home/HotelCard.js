import React from "react";
import hotelImage from "../../images/Hotel.webp";
import "../../styles/HotelList.css";
import { useNavigate } from "react-router-dom";

export default function HotelCard(props) {
	const navigate = useNavigate();

	function searchHotel() {
		navigate('/hotel/' + props.detail.id, {
			state: {
				startDate: props.startDate,
				endDate: props.endDate
			}
		})
	}

	return (
		<div className="card shadow-lg" style={{ width: "24rem" }}>
			<img src={hotelImage} className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">
					<span>{props.detail.name}</span> <span className="right">{props.detail.location}</span>
				</h5>
				<p className="card-text">
					{props.detail.address}
				</p>
				<button className="" onClick={() => searchHotel()}>Find Hotel</button>
			</div>
		</div>
	);
}
