import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WidgetCard = ({ title, icon, children, collapsible = false, defaultCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            {title}
          </h3>
        </div>
        {collapsible && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-muted rounded transition-smooth"
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <Icon name={isCollapsed ? 'ChevronDown' : 'ChevronUp'} size={20} />
          </button>
        )}
      </div>
      {!isCollapsed && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default WidgetCard;