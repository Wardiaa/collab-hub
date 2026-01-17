import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentView, 
  onViewChange, 
  currentDate, 
  onNavigate,
  onTodayClick 
}) => {
  const views = [
    { id: 'month', label: 'Month', icon: 'Calendar' },
    { id: 'week', label: 'Week', icon: 'CalendarDays' },
    { id: 'day', label: 'Day', icon: 'CalendarClock' },
    { id: 'agenda', label: 'Agenda', icon: 'List' }
  ];

  const formatDateDisplay = () => {
    const options = { year: 'numeric', month: 'long' };
    if (currentView === 'day') {
      return currentDate?.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    if (currentView === 'week') {
      const weekStart = new Date(currentDate);
      weekStart?.setDate(currentDate?.getDate() - currentDate?.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd?.setDate(weekStart?.getDate() + 6);
      return `${weekStart?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    return currentDate?.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={() => onNavigate('prev')}
          className="w-10 h-10 p-0"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={onTodayClick}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronRight"
          iconPosition="right"
          onClick={() => onNavigate('next')}
          className="w-10 h-10 p-0"
        />
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground ml-2">
          {formatDateDisplay()}
        </h2>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="hidden md:flex items-center gap-1 bg-muted rounded-md p-1">
          {views?.map((view) => (
            <button
              key={view?.id}
              onClick={() => onViewChange(view?.id)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-md transition-smooth text-sm font-caption font-medium
                ${currentView === view?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background'
                }
              `}
            >
              <Icon name={view?.icon} size={16} />
              <span>{view?.label}</span>
            </button>
          ))}
        </div>

        <select
          value={currentView}
          onChange={(e) => onViewChange(e?.target?.value)}
          className="md:hidden flex-1 px-3 py-2 bg-muted border border-border rounded-md text-sm font-caption font-medium text-foreground"
        >
          {views?.map((view) => (
            <option key={view?.id} value={view?.id}>
              {view?.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CalendarHeader;