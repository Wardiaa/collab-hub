import React from 'react';
import Icon from '../../../components/AppIcon';

const ActiveProjects = () => {
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      progress: 75,
      status: "on-track",
      dueDate: "Jan 25, 2026",
      teamSize: 6,
      tasksCompleted: 18,
      totalTasks: 24,
    },
    {
      id: 2,
      name: "Mobile App Development",
      progress: 45,
      status: "at-risk",
      dueDate: "Feb 10, 2026",
      teamSize: 8,
      tasksCompleted: 12,
      totalTasks: 27,
    },
    {
      id: 3,
      name: "Marketing Campaign Q1",
      progress: 90,
      status: "on-track",
      dueDate: "Jan 20, 2026",
      teamSize: 4,
      tasksCompleted: 27,
      totalTasks: 30,
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'on-track': 'text-success',
      'at-risk': 'text-warning',
      'delayed': 'text-error',
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const getStatusBg = (status) => {
    const colors = {
      'on-track': 'bg-success/10',
      'at-risk': 'bg-warning/10',
      'delayed': 'bg-error/10',
    };
    return colors?.[status] || 'bg-muted';
  };

  return (
    <div className="space-y-4">
      {projects?.map((project) => (
        <div
          key={project?.id}
          className="p-4 rounded-md border border-border hover:border-primary/50 transition-smooth cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-caption font-semibold text-foreground line-clamp-1">
                {project?.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-caption font-medium px-2 py-1 rounded ${getStatusBg(project?.status)} ${getStatusColor(project?.status)}`}>
                  {project?.status?.replace('-', ' ')}
                </span>
                <span className="text-xs text-muted-foreground">
                  Due {project?.dueDate}
                </span>
              </div>
            </div>
            <button className="p-1 hover:bg-muted rounded transition-smooth">
              <Icon name="MoreVertical" size={16} />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span className="font-caption font-medium">{project?.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${project?.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-1">
                <Icon name="CheckSquare" size={12} />
                <span>{project?.tasksCompleted}/{project?.totalTasks} tasks</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Users" size={12} />
                <span>{project?.teamSize} members</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full py-2 text-sm font-caption font-medium text-primary hover:bg-primary/10 rounded-md transition-smooth">
        View All Projects
      </button>
    </div>
  );
};

export default ActiveProjects;