import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const WorkspaceSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState({
    id: 1,
    name: 'Design Team',
    role: 'Admin',
  });

  const dropdownRef = useRef(null);

  const workspaces = [
    { id: 1, name: 'Design Team', role: 'Admin' },
    { id: 2, name: 'Marketing Hub', role: 'Member' },
    { id: 3, name: 'Engineering', role: 'Admin' },
    { id: 4, name: 'Product Strategy', role: 'Member' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-smooth"
        aria-label="Select workspace"
        aria-expanded={isOpen}
      >
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-caption font-medium text-foreground">
            {selectedWorkspace?.name}
          </span>
          <span className="text-xs text-muted-foreground">{selectedWorkspace?.role}</span>
        </div>
        <Icon name="ChevronDown" size={16} className={`transition-smooth ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover rounded-md shadow-warm-lg z-1100 overflow-hidden">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-caption font-medium text-muted-foreground uppercase tracking-wide">
              Your Workspaces
            </div>
            {workspaces?.map((workspace) => (
              <button
                key={workspace?.id}
                onClick={() => selectWorkspace(workspace)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-md transition-smooth
                  ${selectedWorkspace?.id === workspace?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-popover-foreground'
                  }
                `}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-caption font-medium">{workspace?.name}</span>
                  <span className="text-xs opacity-80">{workspace?.role}</span>
                </div>
                {selectedWorkspace?.id === workspace?.id && (
                  <Icon name="Check" size={16} />
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-border p-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-smooth text-popover-foreground">
              <Icon name="Plus" size={16} />
              <span className="text-sm font-caption font-medium">Create Workspace</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSelector;