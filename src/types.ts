export interface Holiday {
    date: string;
    name: string;
  }
  
  export interface Booking {
    date: string;
    title: string;
    description?: string;
  }
  
  export interface DayCellProps {
    day: Date;
    isToday?: boolean;
    isSelected?: boolean;
    isHoliday?: boolean;
    holidayName?: string | null;
    bookingCount?: number;
    availableSlots?: number;
    onSelect: () => void;
    customRenderer?: (props: DayCellProps) => React.ReactNode;
  }
  
  export interface BookingsProps {
    bookings: Booking[];
    availableSlots: number;
  }
  
  export interface CalendarProps {
    holidays?: Holiday[];
    bookings?: Booking[];
    slotsPerDay?: number;
    onDateSelect?: (date: Date, bookings: Booking[]) => void;
    customDayRenderer?: (props: DayCellProps) => React.ReactNode;
    locale?: string;
  }