import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskListView = ({ tasks, selectedTasks, onTaskSelect, onTaskClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'todo': { label: 'To Do', color: 'bg-muted text-muted-foreground' },
      'in-progress': { label: 'In Progress', color: 'bg-primary/10 text-primary' },
      'review': { label: 'Review', color: 'bg-warning/10 text-warning' },
      'completed': { label: 'Completed', color: 'bg-success/10 text-success' },
    };
    return badges?.[status] || badges?.['todo'];
  };

  return (
    <div className="bg-card rounded-lg shadow-warm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={selectedTasks?.length === tasks?.length && tasks?.length > 0}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      onTaskSelect(tasks?.map(t => t?.id));
                    } else {
                      onTaskSelect([]);
                    }
                  }}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-caption font-semibold text-foreground">
                Task
              </th>
              <th className="px-4 py-3 text-left text-sm font-caption font-semibold text-foreground hidden md:table-cell">
                Assignee
              </th>
              <th className="px-4 py-3 text-left text-sm font-caption font-semibold text-foreground hidden lg:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-caption font-semibold text-foreground hidden lg:table-cell">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-sm font-caption font-semibold text-foreground">
                Due Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-caption font-semibold text-foreground hidden xl:table-cell">
                Progress
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks?.map((task) => {
              const isOverdue = new Date(task.dueDate) < new Date() && task?.status !== 'completed';
              const statusBadge = getStatusBadge(task?.status);

              return (
                <tr
                  key={task?.id}
                  className="hover:bg-muted/30 transition-smooth cursor-pointer"
                  onClick={() => onTaskClick(task)}
                >
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedTasks?.includes(task?.id)}
                      onChange={(e) => {
                        e?.stopPropagation();
                        if (e?.target?.checked) {
                          onTaskSelect([...selectedTasks, task?.id]);
                        } else {
                          onTaskSelect(selectedTasks?.filter(id => id !== task?.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm md:text-base font-caption font-medium text-foreground line-clamp-1">
                        {task?.title}
                      </span>
                      {task?.description && (
                        <span className="text-sm text-muted-foreground line-clamp-1">
                          {task?.description}
                        </span>
                      )}
                      <div className="flex items-center gap-2 mt-1 md:hidden">
                        {task?.assignee && (
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 rounded-full overflow-hidden bg-primary/10">
                              <Image
                                src={task?.assignee?.avatar}
                                alt={task?.assignee?.avatarAlt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {task?.assignee?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {task?.assignee && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                          <Image
                            src={task?.assignee?.avatar}
                            alt={task?.assignee?.avatarAlt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-foreground">{task?.assignee?.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`px-2 py-1 text-xs font-caption font-medium rounded ${statusBadge?.color}`}>
                      {statusBadge?.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className={`text-sm font-caption font-medium ${getPriorityColor(task?.priority)}`}>
                      {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Icon
                        name="Calendar"
                        size={14}
                        color={isOverdue ? 'var(--color-error)' : 'var(--color-muted-foreground)'}
                      />
                      <span className={`text-sm whitespace-nowrap ${isOverdue ? 'text-error font-medium' : 'text-muted-foreground'}`}>
                        {new Date(task.dueDate)?.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell">
                    {task?.subtasks && task?.subtasks?.total > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden min-w-[80px]">
                          <div
                            className="h-full bg-primary transition-smooth"
                            style={{
                              width: `${(task?.subtasks?.completed / task?.subtasks?.total) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {task?.subtasks?.completed}/{task?.subtasks?.total}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {tasks?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" />
          <p className="mt-4 text-sm text-muted-foreground">No tasks found</p>
        </div>
      )}
    </div>
  );
};

export default TaskListView;