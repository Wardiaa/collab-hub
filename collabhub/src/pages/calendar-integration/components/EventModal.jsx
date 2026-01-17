import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const EventModal = ({ isOpen, onClose, event, onSave, teamMembers }) => {
  const [formData, setFormData] = useState(event || {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    type: 'meeting',
    attendees: [],
    videoLink: '',
    recurring: false,
    recurringPattern: 'none',
    reminders: ['15min']
  });

  const eventTypes = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'event', label: 'Event' },
    { value: 'deadline', label: 'Deadline' },
    { value: 'reminder', label: 'Reminder' }
  ];

  const recurringPatterns = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const reminderOptions = [
    { value: '5min', label: '5 minutes before' },
    { value: '15min', label: '15 minutes before' },
    { value: '30min', label: '30 minutes before' },
    { value: '1hour', label: '1 hour before' },
    { value: '1day', label: '1 day before' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAttendeeToggle = (memberId) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev?.attendees?.includes(memberId)
        ? prev?.attendees?.filter(id => id !== memberId)
        : [...prev?.attendees, memberId]
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
    onClose();
  };

  const generateVideoLink = () => {
    const meetingId = Math.random()?.toString(36)?.substring(7);
    handleChange('videoLink', `https://meet.collabhub.com/${meetingId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1400 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="px-6 py-4 space-y-4">
            <Input
              label="Event Title"
              type="text"
              placeholder="Enter event title"
              value={formData?.title}
              onChange={(e) => handleChange('title', e?.target?.value)}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Event Type"
                options={eventTypes}
                value={formData?.type}
                onChange={(value) => handleChange('type', value)}
              />

              <Input
                label="Location"
                type="text"
                placeholder="Meeting room or address"
                value={formData?.location}
                onChange={(e) => handleChange('location', e?.target?.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="datetime-local"
                value={formData?.startTime}
                onChange={(e) => handleChange('startTime', e?.target?.value)}
                required
              />

              <Input
                label="End Time"
                type="datetime-local"
                value={formData?.endTime}
                onChange={(e) => handleChange('endTime', e?.target?.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-caption font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleChange('description', e?.target?.value)}
                placeholder="Add event description..."
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-caption font-medium text-foreground mb-3">
                Attendees
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto border border-border rounded-md p-3">
                {teamMembers?.map((member) => (
                  <div
                    key={member?.id}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-smooth cursor-pointer"
                    onClick={() => handleAttendeeToggle(member?.id)}
                  >
                    <Checkbox
                      checked={formData?.attendees?.includes(member?.id)}
                      onChange={() => handleAttendeeToggle(member?.id)}
                    />
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={member?.avatar}
                        alt={member?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-caption font-medium text-foreground truncate">
                        {member?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {member?.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-caption font-medium text-foreground">
                  Video Conference
                </label>
                {formData?.videoLink ? (
                  <div className="flex items-center gap-2">
                    <Icon name="Video" size={16} color="var(--color-success)" />
                    <span className="text-xs text-success">Link generated</span>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    onClick={generateVideoLink}
                  >
                    Generate Link
                  </Button>
                )}
              </div>
              {formData?.videoLink && (
                <Input
                  type="text"
                  value={formData?.videoLink}
                  onChange={(e) => handleChange('videoLink', e?.target?.value)}
                  placeholder="Video conference link"
                />
              )}
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Recurring Event"
                checked={formData?.recurring}
                onChange={(e) => handleChange('recurring', e?.target?.checked)}
              />

              {formData?.recurring && (
                <Select
                  label="Repeat Pattern"
                  options={recurringPatterns}
                  value={formData?.recurringPattern}
                  onChange={(value) => handleChange('recurringPattern', value)}
                />
              )}
            </div>

            <Select
              label="Reminders"
              options={reminderOptions}
              value={formData?.reminders?.[0]}
              onChange={(value) => handleChange('reminders', [value])}
            />
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Check"
              iconPosition="left"
            >
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;