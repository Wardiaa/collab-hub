import React from 'react';
import Icon from '../../../components/AppIcon';

const CalendarWidget = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Team Sync Meeting",
      time: "10:00 AM - 11:00 AM",
      date: "Today",
      type: "meeting",
      attendees: 8,
    },
    {
      id: 2,
      title: "Project Review",
      time: "2:00 PM - 3:30 PM",
      date: "Today",
      type: "review",
      attendees: 5,
    },
    {
      id: 3,
      title: "Client Presentation",
      time: "11:00 AM - 12:00 PM",
      date: "Tomorrow",
      type: "presentation",
      attendees: 12,
    },
  ];

  const getEventColor = (type) => {
    const colors = {
      meeting: 'bg-primary/10 text-primary',
      review: 'bg-warning/10 text-warning',
      presentation: 'bg-success/10 text-success',
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-3">
      {upcomingEvents?.map((event) => (
        <div
          key={event?.id}
          className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-smooth cursor-pointer"
        >
          <div className={`w-10 h-10 rounded-md ${getEventColor(event?.type)} flex items-center justify-center flex-shrink-0`}>
            <Icon name="Calendar" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-caption font-medium text-foreground line-clamp-1">
              {event?.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {event?.date} • {event?.time}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Users" size={12} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">{event?.attendees} attendees</span>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full py-2 text-sm font-caption font-medium text-primary hover:bg-primary/10 rounded-md transition-smooth">
        View Full Calendar
      </button>
    </div>
  );
};

export default CalendarWidget;