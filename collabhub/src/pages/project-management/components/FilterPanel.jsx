import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, teamMembers, tags }) => {
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dueDateFilter, setDueDateFilter] = useState('');

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];

  const dueDateOptions = [
    { value: '', label: 'All dates' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'today', label: 'Due today' },
    { value: 'week', label: 'Due this week' },
    { value: 'month', label: 'Due this month' },
  ];

  const assigneeOptions = teamMembers?.map(member => ({
    value: member?.id,
    label: member?.name,
  }));

  const tagOptions = tags?.map(tag => ({
    value: tag?.id,
    label: tag?.name,
  }));

  const handleApply = () => {
    onApplyFilters({
      assignees: selectedAssignees,
      priorities: selectedPriorities,
      tags: selectedTags,
      dueDate: dueDateFilter,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedAssignees([]);
    setSelectedPriorities([]);
    setSelectedTags([]);
    setDueDateFilter('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 z-1400 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`
        fixed lg:relative top-0 right-0 h-full lg:h-auto w-80 lg:w-full
        bg-card shadow-warm-lg lg:shadow-warm rounded-l-lg lg:rounded-lg
        z-1500 lg:z-auto transition-smooth
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Filter Tasks
          </h3>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-muted rounded-md transition-smooth"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)] lg:max-h-none">
          <div>
            <Select
              label="Assignee"
              placeholder="Select team members"
              options={assigneeOptions}
              value={selectedAssignees}
              onChange={setSelectedAssignees}
              multiple
              searchable
              clearable
            />
          </div>

          <div>
            <label className="block text-sm font-caption font-medium text-foreground mb-3">
              Priority
            </label>
            <div className="space-y-2">
              {priorityOptions?.map(option => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={selectedPriorities?.includes(option?.value)}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      setSelectedPriorities([...selectedPriorities, option?.value]);
                    } else {
                      setSelectedPriorities(selectedPriorities?.filter(p => p !== option?.value));
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <Select
              label="Due Date"
              options={dueDateOptions}
              value={dueDateFilter}
              onChange={setDueDateFilter}
            />
          </div>

          <div>
            <Select
              label="Tags"
              placeholder="Select tags"
              options={tagOptions}
              value={selectedTags}
              onChange={setSelectedTags}
              multiple
              searchable
              clearable
            />
          </div>
        </div>

        <div className="p-4 md:p-6 border-t border-border flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            fullWidth
          >
            Reset
          </Button>
          <Button
            variant="default"
            onClick={handleApply}
            fullWidth
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;