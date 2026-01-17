import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from Sarah Chen',
      description: 'Hey, can we discuss the Q1 roadmap?',
      time: '2 min ago',
      read: false,
      icon: 'MessageSquare',
    },
    {
      id: 2,
      type: 'project',
      title: 'Project milestone completed',
      description: 'Design System v2.0 has been marked complete',
      time: '1 hour ago',
      read: false,
      icon: 'CheckCircle',
    },
    {
      id: 3,
      type: 'calendar',
      title: 'Meeting starting soon',
      description: 'Team Sync in 15 minutes',
      time: '45 min ago',
      read: false,
      icon: 'Calendar',
    },
    {
      id: 4,
      type: 'file',
      title: 'File shared with you',
      description: 'Q1_Budget_Report.xlsx',
      time: '3 hours ago',
      read: true,
      icon: 'FileText',
    },
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id) => {
    setNotifications(notifications?.map(n =>
      n?.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications?.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(notifications?.filter(n => n?.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-md hover:bg-muted transition-smooth"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-error text-error-foreground text-xs font-caption font-medium rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover rounded-md shadow-warm-lg z-1200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-caption font-semibold text-popover-foreground">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-caption font-medium text-primary hover:text-primary/80 transition-smooth"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Icon name="Bell" size={48} color="var(--color-muted-foreground)" />
                <p className="mt-4 text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`
                      p-4 transition-smooth hover:bg-muted cursor-pointer
                      ${!notification?.read ? 'bg-primary/5' : ''}
                    `}
                    onClick={() => markAsRead(notification?.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0
                        ${notification?.type === 'message' ? 'bg-primary/10' : ''}
                        ${notification?.type === 'project' ? 'bg-success/10' : ''}
                        ${notification?.type === 'calendar' ? 'bg-warning/10' : ''}
                        ${notification?.type === 'file' ? 'bg-accent/10' : ''}
                      `}>
                        <Icon
                          name={notification?.icon}
                          size={16}
                          color={
                            notification?.type === 'message' ? 'var(--color-primary)' :
                            notification?.type === 'project' ? 'var(--color-success)' :
                            notification?.type === 'calendar' ? 'var(--color-warning)' :
                            'var(--color-accent)'
                          }
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-caption font-medium text-popover-foreground">
                            {notification?.title}
                          </p>
                          <button
                            onClick={(e) => {
                              e?.stopPropagation();
                              clearNotification(notification?.id);
                            }}
                            className="p-1 hover:bg-muted rounded transition-smooth"
                            aria-label="Clear notification"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {notification?.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{notification?.time}</p>
                      </div>
                      {!notification?.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications?.length > 0 && (
            <div className="border-t border-border p-2">
              <button className="w-full px-3 py-2 text-sm font-caption font-medium text-primary hover:bg-muted rounded-md transition-smooth">
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;