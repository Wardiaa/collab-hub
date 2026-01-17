import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const EventDetailsModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  const getEventTypeColor = () => {
    switch (event?.type) {
      case 'meeting':
        return 'text-primary';
      case 'deadline':
        return 'text-error';
      case 'event':
        return 'text-success';
      case 'reminder':
        return 'text-warning';
      default:
        return 'text-foreground';
    }
  };

  const getEventTypeBg = () => {
    switch (event?.type) {
      case 'meeting':
        return 'bg-primary/10';
      case 'deadline':
        return 'bg-error/10';
      case 'event':
        return 'bg-success/10';
      case 'reminder':
        return 'bg-warning/10';
      default:
        return 'bg-muted';
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getDuration = () => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    const minutes = Math.round((end - start) / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1400 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${getEventTypeBg()} flex items-center justify-center`}>
              <Icon 
                name={event?.icon} 
                size={20}
                color={
                  event?.type === 'meeting' ? 'var(--color-primary)' :
                  event?.type === 'deadline' ? 'var(--color-error)' :
                  event?.type === 'event' ? 'var(--color-success)' :
                  'var(--color-warning)'
                }
              />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground">
                {event?.title}
              </h2>
              <p className={`text-sm font-caption font-medium capitalize ${getEventTypeColor()}`}>
                {event?.type}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Icon name="Clock" size={20} color="var(--color-muted-foreground)" />
              <div className="flex-1">
                <p className="text-sm font-caption font-medium text-foreground mb-1">
                  {formatDateTime(event?.startTime)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Duration: {getDuration()}
                </p>
              </div>
            </div>

            {event?.location && (
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={20} color="var(--color-muted-foreground)" />
                <div className="flex-1">
                  <p className="text-sm font-caption font-medium text-foreground">
                    {event?.location}
                  </p>
                </div>
              </div>
            )}

            {event?.description && (
              <div className="flex items-start gap-3">
                <Icon name="FileText" size={20} color="var(--color-muted-foreground)" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {event?.description}
                  </p>
                </div>
              </div>
            )}

            {event?.videoLink && (
              <div className="flex items-start gap-3">
                <Icon name="Video" size={20} color="var(--color-muted-foreground)" />
                <div className="flex-1">
                  <a
                    href={event?.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline font-caption font-medium"
                  >
                    Join video conference
                  </a>
                </div>
              </div>
            )}

            {event?.attendees && event?.attendees?.length > 0 && (
              <div className="flex items-start gap-3">
                <Icon name="Users" size={20} color="var(--color-muted-foreground)" />
                <div className="flex-1">
                  <p className="text-sm font-caption font-medium text-foreground mb-3">
                    Attendees ({event?.attendees?.length})
                  </p>
                  <div className="space-y-2">
                    {event?.attendees?.map((attendee, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-smooth">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={attendee?.avatar}
                            alt={attendee?.avatarAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-caption font-medium text-foreground truncate">
                            {attendee?.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {attendee?.role}
                          </p>
                        </div>
                        <div className={`
                          px-2 py-1 rounded text-xs font-caption font-medium
                          ${attendee?.status === 'accepted' ? 'bg-success/10 text-success' : ''}
                          ${attendee?.status === 'declined' ? 'bg-error/10 text-error' : ''}
                          ${attendee?.status === 'pending' ? 'bg-warning/10 text-warning' : ''}
                        `}>
                          {attendee?.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/50">
          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={() => {
              onDelete(event?.id);
              onClose();
            }}
          >
            Delete Event
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              iconName="Edit"
              iconPosition="left"
              onClick={() => {
                onEdit(event);
                onClose();
              }}
            >
              Edit Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;