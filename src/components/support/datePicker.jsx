import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./calender.css";

const DateOfBirthInput = ({ 
  onChange, 
  selectedDate, 
  label = "Date of Birth", 
  required = false, 
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valid, setValid] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check screen size on resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateDate = (date) => {
    if (!date) return true;
    
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );
    
    return date <= today && date <= minAgeDate;
  };

  const handleChange = (date) => {
    const isValid = validateDate(date);
    setValid(isValid);
    onChange(date, isValid);
    if (isMobile) setIsOpen(false); // Auto-close on mobile after selection
  };

  const toggleCalendar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`date-of-birth-container ${className}`}>
      {label && (
        <label htmlFor="dob" className="dob-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <div className="date-picker-wrapper">
        <DatePicker
          id="dob"
          selected={selectedDate}
          onChange={handleChange}
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
          dateFormat={isMobile ? "MM/dd/yyyy" : "MMMM d, yyyy"} // More readable on desktop
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText={isMobile ? "MM/DD/YYYY" : "Select your date of birth"}
          maxDate={new Date()}
          minDate={new Date(1900, 0, 1)}
          disabled={disabled}
          className={`dob-input ${!valid ? 'invalid' : ''}`}
          popperPlacement={isMobile ? "bottom" : "bottom-start"}
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
            },
          }}
          showPopperArrow={!isMobile}
          calendarClassName={isMobile ? "mobile-calendar" : ""}
        />
        <button 
          className="calendar-toggle-button" 
          onClick={toggleCalendar}
          disabled={disabled}
          aria-label="Toggle calendar"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </button>
      </div>
      
      {!valid && (
        <p className="validation-message">
          You must be at least 13 years old to register.
        </p>
      )}
    </div>
  );
};

export default DateOfBirthInput;