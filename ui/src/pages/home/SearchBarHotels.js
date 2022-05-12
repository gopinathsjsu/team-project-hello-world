import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from '../../common/helper/api';
import getLinks from '../../common/helper/links';


export default function SearchBarHotels(props) {
	let links = getLinks();
	// const [formData, setFormDate] = useState({
	// 	inputCity: '',
	// 	startDate: new Date(),
	// 	endDate: new Date()
	// })

	useEffect(() => {
		API({
			callURL: links.hotels,
			callMethod: "GET",
			callBack: (res) => {
				if (res.status) {
					props.setHotels(res.data);
				}
				else {
					props.setHotels([]);
				}
			}
		})

	}, [])

	function search(e) {
		e.preventDefault();
		let params = { ...props.formData }
		console.log(params)
		API({
			callURL: links.hotels,
			callMethod: "GET",
			urlParams: params,
			callBack: (res) => {
				if (res.status) {
					props.setHotels(res.data);
				}
				else {
					props.setHotels([]);
				}

			}
		})
	}

	return (
		<div className="row search-bar-container">
			<form className="row g-3" onSubmit={(e) => search(e)}>
				<div className="col-md-6">
					<label className="form-label">
						City
					</label>
					<input
						type="text"
						className="form-control"
						id="inputCity"
						placeholder="Search By City"
						value={props.formData.inputCity}
						onChange={((e) => props.setFormDate({ ...props.formData, location: e.target.value }))}
					/>
				</div>
				<div className="col-md-6">
					<div className="row date-container">
						<div className="col-md-3">
							<label className="form-label">Start Date</label>
							<DatePicker valueDefault={null} selected={props.formData.start} onChange={(date) =>{return props.setFormDate({ ...props.formData, start: (date === null ? null:new Date(date)) })}} />
						</div>
						<div className="col-md-3">
							<label className="form-label">End Date</label>
							<DatePicker valueDefault={null} selected={props.formData.end} onChange={(date) =>{return props.setFormDate({ ...props.formData, end: (date === null ? null:new Date(date)) })}} />
						</div>
					</div>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">
						Search
					</button>
				</div>
			</form>
		</div>
	);
}
