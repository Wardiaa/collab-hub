import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectHeader = ({ project, onFilterClick, onViewChange, currentView }) => {
  const completionPercentage = Math.round(
    (project?.completedTasks / project?.totalTasks) * 100
  );

  return (
    <div className="bg-card rounded-lg shadow-warm p-4 md:p-6 lg:p-8 mb-4 md:mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
            {project?.name}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
            {project?.description}
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-smooth"
            aria-label="Open filters"
          >
            <Icon name="Filter" size={18} />
            <span className="text-sm font-caption font-medium hidden sm:inline">Filters</span>
          </button>
          
          <div className="flex items-center bg-muted rounded-md p-1">
            <button
              onClick={() => onViewChange('board')}
              className={`p-2 rounded transition-smooth ${
                currentView === 'board' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Board view"
            >
              <Icon name="LayoutGrid" size={18} />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`p-2 rounded transition-smooth ${
                currentView === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="List view"
            >
              <Icon name="List" size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-background rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
              {completionPercentage}%
            </span>
            <span className="text-sm text-muted-foreground">
              {project?.completedTasks}/{project?.totalTasks} tasks
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success transition-smooth"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-background rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Team Members</span>
            <Icon name="Users" size={16} color="var(--color-primary)" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
              {project?.teamMembers?.length}
            </span>
            <span className="text-sm text-muted-foreground">active</span>
          </div>
          <div className="flex -space-x-2">
            {project?.teamMembers?.slice(0, 5)?.map((member, index) => (
              <div
                key={member?.id}
                className="w-8 h-8 rounded-full border-2 border-card overflow-hidden bg-primary/10"
                style={{ zIndex: 5 - index }}
              >
                <Image
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {project?.teamMembers?.length > 5 && (
              <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                <span className="text-xs font-caption font-medium text-muted-foreground">
                  +{project?.teamMembers?.length - 5}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-background rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Deadline</span>
            <Icon name="Calendar" size={16} color="var(--color-warning)" />
          </div>
          <div className="mb-2">
            <span className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
              {project?.daysRemaining}
            </span>
            <span className="text-sm text-muted-foreground ml-2">days left</span>
          </div>
          <p className="text-sm text-muted-foreground">{project?.deadline}</p>
        </div>

        <div className="bg-background rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Budget</span>
            <Icon name="DollarSign" size={16} color="var(--color-accent)" />
          </div>
          <div className="mb-2">
            <span className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
              ${project?.budgetSpent}k
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              / ${project?.budgetTotal}k
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-smooth"
              style={{ width: `${(project?.budgetSpent / project?.budgetTotal) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;