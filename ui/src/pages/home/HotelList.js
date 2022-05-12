import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import SearchBarHotels from "./SearchBarHotels";

export default function HotelList() {
	const [hotels, setHotels] = useState([])
	const [formData, setFormDate] = useState({
		location: '',
		start: new Date(),
		end: new Date()
	})
	

	return (
		<div className="container">
			<SearchBarHotels formData={formData} setFormDate={setFormDate} setHotels={setHotels} />
			<div className="row">
				<div className="hotel-card-container">
					{
						hotels.length === 0 ? <>Oops No hotel to show</> :
							hotels.map((item, index) => (
								<HotelCard key={index} detail={item} startDate={formData.start} endDate={formData.end} />
							))
					}
				</div>
			</div>
		</div>
	);
}
