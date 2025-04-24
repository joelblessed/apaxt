import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./calender.css"

const DateOfBirthInput = ({onChange, selectedDate}) => {



  return (
    <div>
      <label htmlFor="dob"></label>
      <DatePicker
        id="dob"
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/dd/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="Select your date of birth"
        maxDate={new Date()} // Prevent selecting future dates
      />
    </div>
  );
};

export default DateOfBirthInput;