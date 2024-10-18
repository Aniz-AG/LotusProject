// DatePickerButton.js
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from "react-icons/fa";

const DatePickerButton = ({ selectedDate, onDateChange }) => {
  const [startDate, setStartDate] = useState(selectedDate || new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    //console.log(startDate); // Log the updated startDate after it has been set
  }, [startDate]);

  const handleDateChange = (date) => {
    setStartDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className='flex justify-between items-center px-2 w-full border rounded-full bg-white' onClick={openDatePicker}>
      <DatePicker 
        selected={startDate}
        onChange={(date) => handleDateChange(date)}
        className=" flex-grow border-none py-1 text-sm"
        ref={datePickerRef}
      />
    </div>
  );
};

export default DatePickerButton;
