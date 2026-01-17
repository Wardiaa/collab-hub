import React from 'react';
import Icon from '../../../components/AppIcon';

const FolderBreadcrumb = ({ path, onNavigate }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onNavigate('root')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted transition-smooth flex-shrink-0"
      >
        <Icon name="Home" size={16} />
        <span className="text-sm font-caption font-medium text-foreground">My Files</span>
      </button>
      {path?.map((folder, index) => (
        <React.Fragment key={folder?.id}>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
          <button
            onClick={() => onNavigate(folder?.id)}
            className={`
              px-3 py-1.5 rounded-md transition-smooth flex-shrink-0
              ${index === path?.length - 1
                ? 'bg-primary/10 text-primary font-medium' :'hover:bg-muted text-foreground'
              }
            `}
          >
            <span className="text-sm font-caption">{folder?.name}</span>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FolderBreadcrumb;