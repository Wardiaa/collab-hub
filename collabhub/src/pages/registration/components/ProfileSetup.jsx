import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ProfileSetup = ({ data, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    phoneNumber: '',
    timezone: '',
  });
  const [errors, setErrors] = useState({});

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product Management' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
    { value: 'other', label: 'Other' },
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.jobTitle?.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData?.department) {
      newErrors.department = 'Please select your department';
    }

    if (!formData?.timezone) {
      newErrors.timezone = 'Please select your timezone';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onComplete({ ...data, ...formData });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="UserCheck" size={32} color="var(--color-success)" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Complete Your Profile</h2>
        <p className="text-sm text-muted-foreground">
          Help your team get to know you better
        </p>
      </div>

      <Input
        label="Job Title"
        type="text"
        name="jobTitle"
        placeholder="e.g., Senior Product Designer"
        value={formData?.jobTitle}
        onChange={handleInputChange}
        error={errors?.jobTitle}
        required
      />

      <Select
        label="Department"
        options={departmentOptions}
        value={formData?.department}
        onChange={(value) => handleSelectChange('department', value)}
        placeholder="Select your department"
        error={errors?.department}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        placeholder="+1 (555) 000-0000"
        value={formData?.phoneNumber}
        onChange={handleInputChange}
        error={errors?.phoneNumber}
        description="Optional - for important notifications"
      />

      <Select
        label="Timezone"
        options={timezoneOptions}
        value={formData?.timezone}
        onChange={(value) => handleSelectChange('timezone', value)}
        placeholder="Select your timezone"
        error={errors?.timezone}
        searchable
        required
      />

      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">What's next?</p>
            <p className="text-sm text-muted-foreground">
              After completing your profile, you'll be taken to your workspace dashboard where you can start collaborating with your team.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" variant="default" size="lg" className="flex-1">
          Complete Setup
        </Button>
      </div>
    </form>
  );
};

export default ProfileSetup;