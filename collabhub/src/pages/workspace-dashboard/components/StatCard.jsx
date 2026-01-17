import React from 'react';
import Icon from '../../../components/AppIcon';

const StatCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    accent: 'bg-accent/10 text-accent',
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm hover:shadow-warm-md transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-caption">{title}</p>
          <p className="text-2xl md:text-3xl font-heading font-semibold text-foreground mt-2">
            {value}
          </p>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 ${trendColors?.[trend]}`}>
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
              />
              <span className="text-xs font-caption font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses?.[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;