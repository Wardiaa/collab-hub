import React from 'react';
import Icon from '../../../components/AppIcon';

const DayView = ({ currentDate, events, onEventClick }) => {
  const getEventsForDay = () => {
    return events?.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate?.toDateString() === currentDate?.toDateString();
    })?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = getEventsForDay();

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="border-b border-border px-6 py-4 bg-muted">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {currentDate?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {dayEvents?.length} {dayEvents?.length === 1 ? 'event' : 'events'} scheduled
        </p>
      </div>
      <div className="overflow-y-auto max-h-[600px]">
        {hours?.map((hour) => {
          const hourEvents = dayEvents?.filter(event => {
            const eventHour = new Date(event.startTime)?.getHours();
            return eventHour === hour;
          });

          return (
            <div key={hour} className="grid grid-cols-12 border-b border-border min-h-20">
              <div className="col-span-2 px-4 py-3 text-sm font-caption text-muted-foreground bg-muted/50 border-r border-border">
                {hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
              </div>
              <div className="col-span-10 p-3 space-y-2">
                {hourEvents?.length === 0 ? (
                  <div className="h-full flex items-center text-xs text-muted-foreground">
                    No events
                  </div>
                ) : (
                  hourEvents?.map((event) => (
                    <div
                      key={event?.id}
                      onClick={() => onEventClick(event)}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-smooth
                        ${event?.type === 'meeting' ? 'bg-primary/10 hover:bg-primary/20 border-l-4 border-primary' : ''}
                        ${event?.type === 'deadline' ? 'bg-error/10 hover:bg-error/20 border-l-4 border-error' : ''}
                        ${event?.type === 'event' ? 'bg-success/10 hover:bg-success/20 border-l-4 border-success' : ''}
                        ${event?.type === 'reminder' ? 'bg-warning/10 hover:bg-warning/20 border-l-4 border-warning' : ''}
                      `}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon 
                              name={event?.icon} 
                              size={18}
                              color={
                                event?.type === 'meeting' ? 'var(--color-primary)' :
                                event?.type === 'deadline' ? 'var(--color-error)' :
                                event?.type === 'event' ? 'var(--color-success)' :
                                'var(--color-warning)'
                              }
                            />
                            <h4 className="text-base font-caption font-semibold text-foreground">
                              {event?.title}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {new Date(event.startTime)?.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit' 
                            })} - {new Date(event.endTime)?.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit' 
                            })}
                          </p>
                          {event?.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Icon name="MapPin" size={14} />
                              <span>{event?.location}</span>
                            </div>
                          )}
                        </div>
                        {event?.attendees && (
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
                            <span className="text-sm text-muted-foreground">
                              {event?.attendees?.length}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;