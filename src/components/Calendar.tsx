import React, { useState, useEffect, forwardRef } from 'react';
import DayCell from './DayCell';
import Bookings from './Bookings';
import { getWeekDays, getDaysInMonth, isSameDay } from '../utils/dateUtils';
import { CalendarProps, Booking } from '../types';
import '../styles/calendar.css';

const Calendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const { 
    holidays = [], 
    bookings = [],
    slotsPerDay = 10,
    onDateSelect = () => {},
    customDayRenderer,
    locale = 'en-US'
  } = props;

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [selectedDayBookings, setSelectedDayBookings] = useState<Booking[]>([]);
  
  // Initialize the calendar days
  useEffect(() => {
    const days = getDaysInMonth(currentYear, currentMonth);
    setCalendarDays(days);
  }, [currentYear, currentMonth]);
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };
  
  // Handle date selection
  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    
    // Filter bookings for the selected day
    const dayBookings = bookings.filter(booking => 
      isSameDay(new Date(booking.date), day)
    );
    
    setSelectedDayBookings(dayBookings);
    onDateSelect(day, dayBookings);
  };
  
  // Check if a date is a holiday
  const isHoliday = (date: Date) => {
    return holidays.some(holiday => 
      isSameDay(new Date(holiday.date), date)
    );
  };
  
  // Get holiday name if applicable
  const getHolidayName = (date: Date) => {
    const holiday = holidays.find(h => isSameDay(new Date(h.date), date));
    return holiday ? holiday.name : null;
  };
  
  // Get booking count for a day
  const getBookingCount = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(new Date(booking.date), date)
    ).length;
  };
  
  // Calculate available slots
  const getAvailableSlots = (date: Date) => {
    const bookingCount = getBookingCount(date);
    return Math.max(0, slotsPerDay - bookingCount);
  };
  
  // Generate the week view
  const generateWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }
    
    return (
      <div className="calendar-week">
        {getWeekDays(locale).map((dayName, index) => (
          <div key={`header-${index}`} className="calendar-day-header">
            {dayName}
          </div>
        ))}
        
        {days.map((day, index) => (
          <DayCell 
            key={`day-${index}`}
            day={day}
            isToday={isSameDay(day, new Date())}
            isSelected={selectedDate !== null && isSameDay(day, selectedDate)}
            isHoliday={isHoliday(day)}
            holidayName={getHolidayName(day)}
            bookingCount={getBookingCount(day)}
            availableSlots={getAvailableSlots(day)}
            onSelect={() => handleDateSelect(day)}
            customRenderer={customDayRenderer}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="calendar-container" ref={ref}>
      <div className="calendar-header">
        <button onClick={goToPreviousWeek} className="calendar-nav-btn">
          &lt; Previous Week
        </button>
        <h2>
          {`${new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(currentDate)}`}
        </h2>
        <button onClick={goToNextWeek} className="calendar-nav-btn">
          Next Week &gt;
        </button>
      </div>
      
      {generateWeekView()}
      
      {selectedDate && (
        <div className="calendar-details">
          <h3>
            {`${new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(selectedDate)}`}
          </h3>
          {isHoliday(selectedDate) && (
            <div className="holiday-banner">
              {getHolidayName(selectedDate)}
            </div>
          )}
          
          <Bookings 
            bookings={selectedDayBookings} 
            availableSlots={getAvailableSlots(selectedDate)}
          />
        </div>
      )}
    </div>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;