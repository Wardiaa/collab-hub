import React from 'react';
import Icon from '../../../components/AppIcon';
import TaskCard from './TaskCard';

const KanbanColumn = ({
  column,
  tasks,
  onTaskClick,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onAddTask,
}) => {
  const getColumnColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-muted text-muted-foreground';
      case 'in-progress':
        return 'bg-primary/10 text-primary';
      case 'review':
        return 'bg-warning/10 text-warning';
      case 'completed':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex flex-col bg-background rounded-lg min-w-[280px] md:min-w-[320px] h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getColumnColor(column?.id)}`} />
          <h3 className="text-sm md:text-base font-caption font-semibold text-foreground">
            {column?.title}
          </h3>
          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-caption rounded-full">
            {tasks?.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column?.id)}
          className="p-1.5 hover:bg-muted rounded-md transition-smooth"
          aria-label={`Add task to ${column?.title}`}
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column?.id)}
        className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[200px]"
      >
        {tasks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" />
            <p className="mt-4 text-sm text-muted-foreground">No tasks yet</p>
            <button
              onClick={() => onAddTask(column?.id)}
              className="mt-2 text-sm text-primary hover:text-primary/80 font-caption font-medium"
            >
              Add your first task
            </button>
          </div>
        ) : (
          tasks?.map((task) => (
            <TaskCard
              key={task?.id}
              task={task}
              onTaskClick={onTaskClick}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;