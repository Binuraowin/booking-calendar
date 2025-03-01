export const getWeekDays = (locale: string = 'en-US'): string[] => {
    const weekDays: string[] = [];
    const date = new Date();
    const day = date.getDay();
    
    // Set to Sunday (first day of week)
    date.setDate(date.getDate() - day);
    
    // Get all weekday names
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)
      );
      date.setDate(date.getDate() + 1);
    }
    
    return weekDays;
  };
  
  export const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  };
  
  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };