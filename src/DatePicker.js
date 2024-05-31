import React, { useState } from 'react';
import './DatePicker.css'; // We'll add CSS later

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startOfWeek = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    setShowCalendar(false);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`day ${day === selectedDate.getDate() && currentMonth.getMonth() === selectedDate.getMonth() ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="date-picker">
      <input
        type="text"
        value={selectedDate.toDateString()}
        onClick={() => setShowCalendar(!showCalendar)}
        readOnly
      />
      {showCalendar && (
        <div className="calendar">
          <div className="header">
            <button onClick={handlePrevMonth}>&lt;</button>
            <div>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</div>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="days-of-week">
            {daysOfWeek.map((day) => (
              <div key={day} className="day-of-week">{day}</div>
            ))}
          </div>
          <div className="days">{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
