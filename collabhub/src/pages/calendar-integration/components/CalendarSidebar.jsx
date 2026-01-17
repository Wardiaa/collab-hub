import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CalendarSidebar = ({ 
  onCreateEvent, 
  calendarFilters, 
  onFilterChange,
  upcomingEvents,
  onEventClick 
}) => {
  const eventTypes = [
    { id: 'meeting', label: 'Meetings', color: 'bg-primary', count: 12 },
    { id: 'event', label: 'Events', color: 'bg-success', count: 5 },
    { id: 'deadline', label: 'Deadlines', color: 'bg-error', count: 3 },
    { id: 'reminder', label: 'Reminders', color: 'bg-warning', count: 8 }
  ];

  const externalCalendars = [
    { id: 'google', label: 'Google Calendar', icon: 'Calendar', synced: true },
    { id: 'outlook', label: 'Outlook', icon: 'Mail', synced: true },
    { id: 'apple', label: 'Apple Calendar', icon: 'Smartphone', synced: false }
  ];

  return (
    <div className="w-full lg:w-80 bg-card rounded-lg shadow-warm p-4 md:p-6 space-y-6">
      <Button
        variant="default"
        fullWidth
        iconName="Plus"
        iconPosition="left"
        onClick={onCreateEvent}
        className="mb-4"
      >
        Create Event
      </Button>
      <div>
        <h3 className="text-sm font-caption font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Filter" size={16} />
          Event Types
        </h3>
        <div className="space-y-2">
          {eventTypes?.map((type) => (
            <div
              key={type?.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-smooth cursor-pointer"
              onClick={() => onFilterChange(type?.id)}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={calendarFilters?.includes(type?.id)}
                  onChange={() => onFilterChange(type?.id)}
                />
                <div className={`w-3 h-3 rounded ${type?.color}`} />
                <span className="text-sm font-caption text-foreground">
                  {type?.label}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-caption font-medium">
                {type?.count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-caption font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Link" size={16} />
          Connected Calendars
        </h3>
        <div className="space-y-2">
          {externalCalendars?.map((calendar) => (
            <div
              key={calendar?.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-smooth"
            >
              <div className="flex items-center gap-3">
                <Icon name={calendar?.icon} size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm font-caption text-foreground">
                  {calendar?.label}
                </span>
              </div>
              <div className={`
                px-2 py-1 rounded text-xs font-caption font-medium
                ${calendar?.synced ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}
              `}>
                {calendar?.synced ? 'Synced' : 'Connect'}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border pt-6">
        <h3 className="text-sm font-caption font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Clock" size={16} />
          Upcoming Events
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {upcomingEvents?.slice(0, 5)?.map((event) => (
            <div
              key={event?.id}
              onClick={() => onEventClick(event)}
              className="p-3 hover:bg-muted rounded-md transition-smooth cursor-pointer border-l-2 border-primary"
            >
              <div className="flex items-start gap-2 mb-1">
                <Icon 
                  name={event?.icon} 
                  size={14}
                  color={
                    event?.type === 'meeting' ? 'var(--color-primary)' :
                    event?.type === 'deadline' ? 'var(--color-error)' :
                    event?.type === 'event' ? 'var(--color-success)' :
                    'var(--color-warning)'
                  }
                />
                <p className="text-sm font-caption font-medium text-foreground line-clamp-1">
                  {event?.title}
                </p>
              </div>
              <p className="text-xs text-muted-foreground ml-5">
                {new Date(event.startTime)?.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;