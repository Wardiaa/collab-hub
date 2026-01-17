import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskModal = ({ isOpen, onClose, onSave, task, teamMembers, columns }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    assignee: task?.assignee?.id || '',
    status: task?.status || 'todo',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || '',
    tags: task?.tags || [],
    attachments: [],
  });

  const [errors, setErrors] = useState({});

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];

  const statusOptions = columns?.map(col => ({
    value: col?.id,
    label: col?.title,
  }));

  const assigneeOptions = teamMembers?.map(member => ({
    value: member?.id,
    label: member?.name,
  }));

  const availableTags = [
    'Frontend',
    'Backend',
    'Design',
    'Bug',
    'Feature',
    'Documentation',
    'Testing',
    'Urgent',
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTagToggle = (tag) => {
    const newTags = formData?.tags?.includes(tag)
      ? formData?.tags?.filter(t => t !== tag)
      : [...formData?.tags, tag];
    handleChange('tags', newTags);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.title?.trim()) {
      newErrors.title = 'Task title is required';
    }
    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 z-1600"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-1700 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-md transition-smooth"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6 space-y-6">
              <Input
                label="Task Title"
                type="text"
                placeholder="Enter task title"
                value={formData?.title}
                onChange={(e) => handleChange('title', e?.target?.value)}
                error={errors?.title}
                required
              />

              <div>
                <label className="block text-sm font-caption font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData?.description}
                  onChange={(e) => handleChange('description', e?.target?.value)}
                  placeholder="Add task description..."
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Select
                  label="Assignee"
                  placeholder="Select assignee"
                  options={assigneeOptions}
                  value={formData?.assignee}
                  onChange={(value) => handleChange('assignee', value)}
                  searchable
                />

                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleChange('status', value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <Select
                  label="Priority"
                  options={priorityOptions}
                  value={formData?.priority}
                  onChange={(value) => handleChange('priority', value)}
                />

                <Input
                  label="Due Date"
                  type="date"
                  value={formData?.dueDate}
                  onChange={(e) => handleChange('dueDate', e?.target?.value)}
                  error={errors?.dueDate}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-caption font-medium text-foreground mb-3">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags?.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`
                        px-3 py-1.5 text-sm font-caption rounded-md transition-smooth
                        ${formData?.tags?.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }
                      `}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-caption font-medium text-foreground mb-2">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-border rounded-md p-6 text-center hover:border-primary/50 transition-smooth cursor-pointer">
                  <Icon name="Upload" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-border flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                fullWidth
              >
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;