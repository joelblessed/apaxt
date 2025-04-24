import React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateOfBirthInput = ({ selectedDate, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Birth"
        value={selectedDate}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        maxDate={new Date()} // Prevent future dates
      />
    </LocalizationProvider>
  );
};

export default DateOfBirthInput;