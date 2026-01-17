import React from 'react';
import Icon from '../../../components/AppIcon';

const WeekView = ({ currentDate, events, onEventClick }) => {
  const getWeekDays = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek?.setDate(date?.getDate() - date?.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      week?.push(day);
    }

    return week;
  };

  const getEventsForDay = (date) => {
    return events?.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate?.toDateString() === date?.toDateString();
    })?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const weekDays = getWeekDays(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b border-border sticky top-0 bg-card z-10">
            <div className="px-4 py-3 text-xs font-caption font-semibold text-muted-foreground bg-muted">
              Time
            </div>
            {weekDays?.map((day, index) => {
              const isTodayDate = isToday(day);
              return (
                <div
                  key={index}
                  className={`
                    px-2 py-3 text-center border-l border-border
                    ${isTodayDate ? 'bg-primary/5' : 'bg-muted'}
                  `}
                >
                  <div className="text-xs font-caption font-medium text-muted-foreground">
                    {day?.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div
                    className={`
                      text-lg font-heading font-semibold mt-1
                      ${isTodayDate ? 'w-8 h-8 mx-auto flex items-center justify-center bg-primary text-primary-foreground rounded-full' : 'text-foreground'}
                    `}
                  >
                    {day?.getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative">
            {hours?.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b border-border min-h-16">
                <div className="px-4 py-2 text-xs font-caption text-muted-foreground bg-muted/50">
                  {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                </div>
                {weekDays?.map((day, dayIndex) => {
                  const dayEvents = getEventsForDay(day)?.filter(event => {
                    const eventHour = new Date(event.startTime)?.getHours();
                    return eventHour === hour;
                  });

                  return (
                    <div
                      key={dayIndex}
                      className={`
                        border-l border-border p-1 relative
                        ${isToday(day) ? 'bg-primary/5' : ''}
                      `}
                    >
                      {dayEvents?.map((event) => (
                        <div
                          key={event?.id}
                          onClick={() => onEventClick(event)}
                          className={`
                            px-2 py-1 rounded text-xs font-caption cursor-pointer transition-smooth mb-1
                            ${event?.type === 'meeting' ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}
                            ${event?.type === 'deadline' ? 'bg-error/10 text-error hover:bg-error/20' : ''}
                            ${event?.type === 'event' ? 'bg-success/10 text-success hover:bg-success/20' : ''}
                            ${event?.type === 'reminder' ? 'bg-warning/10 text-warning hover:bg-warning/20' : ''}
                          `}
                        >
                          <div className="flex items-center gap-1 mb-0.5">
                            <Icon name={event?.icon} size={10} />
                            <span className="font-medium truncate">{event?.title}</span>
                          </div>
                          <div className="text-xs opacity-80">
                            {new Date(event.startTime)?.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;