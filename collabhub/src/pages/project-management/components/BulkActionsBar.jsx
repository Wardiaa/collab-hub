import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onClearSelection, onBulkAction, columns, teamMembers }) => {
  const statusOptions = columns?.map(col => ({
    value: col?.id,
    label: `Move to ${col?.title}`,
  }));

  const assigneeOptions = teamMembers?.map(member => ({
    value: member?.id,
    label: `Assign to ${member?.name}`,
  }));

  const priorityOptions = [
    { value: 'high', label: 'Set High Priority' },
    { value: 'medium', label: 'Set Medium Priority' },
    { value: 'low', label: 'Set Low Priority' },
  ];

  const allActions = [
    ...statusOptions,
    { value: 'divider-1', label: '---', disabled: true },
    ...assigneeOptions,
    { value: 'divider-2', label: '---', disabled: true },
    ...priorityOptions,
    { value: 'divider-3', label: '---', disabled: true },
    { value: 'delete', label: 'Delete Tasks' },
  ];

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-1300 w-[calc(100%-2rem)] max-w-2xl">
      <div className="bg-card border border-border rounded-lg shadow-warm-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-caption font-semibold text-primary">
                {selectedCount}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-caption font-medium text-foreground">
                {selectedCount} {selectedCount === 1 ? 'task' : 'tasks'} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-48 hidden md:block">
              <Select
                placeholder="Bulk actions"
                options={allActions}
                value=""
                onChange={(value) => {
                  if (value && !value?.startsWith('divider')) {
                    onBulkAction(value);
                  }
                }}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              className="md:hidden"
            >
              Clear
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              className="hidden md:inline-flex"
            >
              Clear Selection
            </Button>
          </div>
        </div>

        <div className="mt-3 flex gap-2 md:hidden overflow-x-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('in-progress')}
            iconName="Play"
          >
            Start
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('completed')}
            iconName="CheckCircle"
          >
            Complete
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onBulkAction('delete')}
            iconName="Trash2"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;