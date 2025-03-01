import React from 'react';
import { DayCellProps } from '../types';

const DayCell: React.FC<DayCellProps> = ({ 
  day, 
  isToday, 
  isSelected, 
  isHoliday, 
  holidayName, 
  bookingCount = 0, 
  availableSlots = 0, 
  onSelect,
  customRenderer
}) => {
  // Use custom renderer if provided
  if (customRenderer) {
    return customRenderer({
      day,
      isToday,
      isSelected,
      isHoliday,
      holidayName,
      bookingCount,
      availableSlots,
      onSelect
    });
  }

  const dayClasses = [
    'calendar-day',
    isToday ? 'today' : '',
    isSelected ? 'selected' : '',
    isHoliday ? 'holiday' : '',
    availableSlots === 0 ? 'fully-booked' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={dayClasses} onClick={onSelect}>
      <div className="day-number">{day.getDate()}</div>
      
      {isHoliday && (
        <div className="holiday-indicator" title={holidayName || undefined}>
          Holiday
        </div>
      )}
      
      <div className="booking-info">
        <span className="booking-count">{bookingCount} booked</span>
        <span className="available-slots">{availableSlots} available</span>
      </div>
    </div>
  );
};

export default DayCell;