import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AgendaView = ({ events, onEventClick }) => {
  const groupEventsByDate = () => {
    const grouped = {};
    
    events?.forEach(event => {
      const dateKey = new Date(event.startTime)?.toDateString();
      if (!grouped?.[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped?.[dateKey]?.push(event);
    });

    Object.keys(grouped)?.forEach(key => {
      grouped?.[key]?.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    });

    return Object.entries(grouped)?.sort((a, b) => 
      new Date(a[0]) - new Date(b[0])
    );
  };

  const isToday = (dateString) => {
    const today = new Date();
    return dateString === today?.toDateString();
  };

  const groupedEvents = groupEventsByDate();

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="divide-y divide-border">
        {groupedEvents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Icon name="Calendar" size={64} color="var(--color-muted-foreground)" />
            <h3 className="mt-4 text-lg font-heading font-semibold text-foreground">
              No upcoming events
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
              Your calendar is clear. Create a new event to get started.
            </p>
          </div>
        ) : (
          groupedEvents?.map(([dateString, dateEvents]) => {
            const date = new Date(dateString);
            const isTodayDate = isToday(dateString);

            return (
              <div key={dateString} className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`
                      flex flex-col items-center justify-center w-14 h-14 rounded-lg
                      ${isTodayDate ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}
                    `}
                  >
                    <span className="text-xs font-caption font-medium uppercase">
                      {date?.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-xl font-heading font-bold">
                      {date?.getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                      {date?.toLocaleDateString('en-US', { weekday: 'long' })}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {dateEvents?.length} {dateEvents?.length === 1 ? 'event' : 'events'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 ml-0 md:ml-17">
                  {dateEvents?.map((event) => (
                    <div
                      key={event?.id}
                      onClick={() => onEventClick(event)}
                      className={`
                        p-4 rounded-lg cursor-pointer transition-smooth border-l-4
                        ${event?.type === 'meeting' ? 'bg-primary/5 hover:bg-primary/10 border-primary' : ''}
                        ${event?.type === 'deadline' ? 'bg-error/5 hover:bg-error/10 border-error' : ''}
                        ${event?.type === 'event' ? 'bg-success/5 hover:bg-success/10 border-success' : ''}
                        ${event?.type === 'reminder' ? 'bg-warning/5 hover:bg-warning/10 border-warning' : ''}
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 text-center">
                          <div className="text-sm font-caption font-semibold text-foreground">
                            {new Date(event.startTime)?.toLocaleTimeString('en-US', { 
                              hour: 'numeric', 
                              minute: '2-digit' 
                            })}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {Math.round((new Date(event.endTime) - new Date(event.startTime)) / 60000)}m
                          </div>
                        </div>

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

                          {event?.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {event?.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            {event?.location && (
                              <div className="flex items-center gap-1.5">
                                <Icon name="MapPin" size={14} />
                                <span>{event?.location}</span>
                              </div>
                            )}
                            {event?.attendees && event?.attendees?.length > 0 && (
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {event?.attendees?.slice(0, 3)?.map((attendee, idx) => (
                                    <div
                                      key={idx}
                                      className="w-6 h-6 rounded-full border-2 border-card overflow-hidden bg-muted"
                                    >
                                      <Image
                                        src={attendee?.avatar}
                                        alt={attendee?.avatarAlt}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                                {event?.attendees?.length > 3 && (
                                  <span className="text-xs">
                                    +{event?.attendees?.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                            {event?.videoLink && (
                              <div className="flex items-center gap-1.5">
                                <Icon name="Video" size={14} />
                                <span>Video call</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AgendaView;