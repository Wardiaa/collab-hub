import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeedItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      message: 'MessageSquare',
      file: 'FileText',
      project: 'FolderKanban',
      meeting: 'Calendar',
      task: 'CheckSquare',
      mention: 'AtSign',
    };
    return iconMap?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      message: 'var(--color-primary)',
      file: 'var(--color-accent)',
      project: 'var(--color-success)',
      meeting: 'var(--color-warning)',
      task: 'var(--color-secondary)',
      mention: 'var(--color-primary)',
    };
    return colorMap?.[type] || 'var(--color-muted-foreground)';
  };

  const getActivityBgColor = (type) => {
    const bgMap = {
      message: 'bg-primary/10',
      file: 'bg-accent/10',
      project: 'bg-success/10',
      meeting: 'bg-warning/10',
      task: 'bg-secondary/10',
      mention: 'bg-primary/10',
    };
    return bgMap?.[type] || 'bg-muted';
  };

  return (
    <div className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-smooth rounded-md cursor-pointer">
      <div className={`w-10 h-10 rounded-full ${getActivityBgColor(activity?.type)} flex items-center justify-center flex-shrink-0`}>
        {activity?.userAvatar ? (
          <Image
            src={activity?.userAvatar}
            alt={activity?.userAvatarAlt}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Icon name={getActivityIcon(activity?.type)} size={20} color={getActivityColor(activity?.type)} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-caption font-medium text-foreground">
              {activity?.userName}
            </p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {activity?.description}
            </p>
            {activity?.context && (
              <p className="text-xs text-primary mt-1 hover:underline">
                {activity?.context}
              </p>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {activity?.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedItem;