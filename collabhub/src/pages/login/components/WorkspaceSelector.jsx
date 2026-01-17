import React, { useState } from 'react';
import Select from '../../../components/ui/Select';

const WorkspaceSelector = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState('');

  const workspaceOptions = [
    { value: 'design-team', label: 'Design Team', description: 'Creative workspace' },
    { value: 'marketing-hub', label: 'Marketing Hub', description: 'Marketing operations' },
    { value: 'engineering', label: 'Engineering', description: 'Development team' },
    { value: 'product-strategy', label: 'Product Strategy', description: 'Product planning' }
  ];

  return (
    <div className="w-full">
      <Select
        label="Select Workspace"
        description="Choose the workspace you want to access"
        placeholder="Select your workspace"
        options={workspaceOptions}
        value={selectedWorkspace}
        onChange={setSelectedWorkspace}
        searchable
      />
    </div>
  );
};

export default WorkspaceSelector;