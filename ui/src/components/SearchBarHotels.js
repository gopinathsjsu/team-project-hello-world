import React from "react";
import DatePicker from "./DatePickerElem";
export default function SearchBarHotels() {
  return (
    <div className="row search-bar-container">
      <form className="row g-3">
        <div className="col-md-6">
          <label for="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            placeholder="Search By City"
          />
        </div>
        <div className="col-md-6">
          <div className="row date-container">
            <div className="col-md-3">
              <label className="form-label">Start Date</label>
              <DatePicker />
            </div>
            <div className="col-md-3">
              <label className="form-label">End Date</label>
              <DatePicker />
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
