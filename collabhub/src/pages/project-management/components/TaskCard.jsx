import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TaskCard = ({ task, onTaskClick, onDragStart, onDragEnd }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task?.status !== 'completed';

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onClick={() => onTaskClick(task)}
      className="bg-card border border-border rounded-md p-4 cursor-pointer hover:shadow-warm-md transition-smooth group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className="text-sm md:text-base font-caption font-semibold text-foreground line-clamp-2 flex-1">
          {task?.title}
        </h4>
        <div className="flex items-center gap-1 flex-shrink-0">
          {task?.attachments > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="Paperclip" size={14} />
              <span className="text-xs">{task?.attachments}</span>
            </div>
          )}
          {task?.comments > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="MessageSquare" size={14} />
              <span className="text-xs">{task?.comments}</span>
            </div>
          )}
        </div>
      </div>
      {task?.description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {task?.description}
        </p>
      )}
      {task?.tags && task?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {task?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {task?.assignee && (
            <div className="w-6 h-6 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
              <Image
                src={task?.assignee?.avatar}
                alt={task?.assignee?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span
            className={`px-2 py-1 text-xs font-caption font-medium rounded border ${getPriorityColor(
              task?.priority
            )}`}
          >
            {task?.priority}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon
            name="Calendar"
            size={14}
            color={isOverdue ? 'var(--color-error)' : 'currentColor'}
          />
          <span className={isOverdue ? 'text-error font-medium' : ''}>
            {new Date(task.dueDate)?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
      {task?.subtasks && task?.subtasks?.total > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {task?.subtasks?.completed}/{task?.subtasks?.total} subtasks
            </span>
            <span className="font-medium text-foreground">
              {Math.round((task?.subtasks?.completed / task?.subtasks?.total) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-primary transition-smooth"
              style={{
                width: `${(task?.subtasks?.completed / task?.subtasks?.total) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;