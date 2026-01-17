import React from 'react';
import Icon from '../../../components/AppIcon';

const MonthView = ({ currentDate, events, onEventClick, onDateClick }) => {
  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days?.push({ date: prevMonthDay, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days?.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days?.length;
    for (let i = 1; i <= remainingDays; i++) {
      days?.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const getEventsForDate = (date) => {
    return events?.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate?.toDateString() === date?.toDateString();
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {weekDays?.map((day) => (
          <div
            key={day}
            className="px-2 py-3 text-center text-xs md:text-sm font-caption font-semibold text-muted-foreground bg-muted"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day?.charAt(0)}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days?.map((day, index) => {
          const dayEvents = getEventsForDate(day?.date);
          const isTodayDate = isToday(day?.date);

          return (
            <div
              key={index}
              onClick={() => onDateClick(day?.date)}
              className={`
                min-h-24 md:min-h-32 border-r border-b border-border p-1 md:p-2 cursor-pointer transition-smooth hover:bg-muted/50
                ${!day?.isCurrentMonth ? 'bg-muted/30' : 'bg-card'}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`
                    text-xs md:text-sm font-caption font-medium
                    ${!day?.isCurrentMonth ? 'text-muted-foreground' : 'text-foreground'}
                    ${isTodayDate ? 'w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-primary text-primary-foreground rounded-full' : ''}
                  `}
                >
                  {day?.date?.getDate()}
                </span>
              </div>
              <div className="space-y-1">
                {dayEvents?.slice(0, 3)?.map((event) => (
                  <div
                    key={event?.id}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`
                      px-1.5 py-1 rounded text-xs font-caption truncate cursor-pointer transition-smooth
                      ${event?.type === 'meeting' ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}
                      ${event?.type === 'deadline' ? 'bg-error/10 text-error hover:bg-error/20' : ''}
                      ${event?.type === 'event' ? 'bg-success/10 text-success hover:bg-success/20' : ''}
                      ${event?.type === 'reminder' ? 'bg-warning/10 text-warning hover:bg-warning/20' : ''}
                    `}
                  >
                    <div className="flex items-center gap-1">
                      <Icon name={event?.icon} size={10} />
                      <span className="truncate">{event?.title}</span>
                    </div>
                  </div>
                ))}
                {dayEvents?.length > 3 && (
                  <div className="text-xs text-muted-foreground font-caption px-1.5">
                    +{dayEvents?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;