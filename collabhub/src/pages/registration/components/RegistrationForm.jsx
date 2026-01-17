import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ data, onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: data?.fullName || '',
    email: data?.email || '',
    password: data?.password || '',
    confirmPassword: '',
    workspace: data?.workspace || '',
    invitationCode: data?.invitationCode || '',
    acceptTerms: data?.acceptTerms || false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const workspaceOptions = [
    { value: 'new', label: 'Create New Workspace' },
    { value: 'join', label: 'Join Existing Workspace' },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (password?.length >= 12) strength++;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^a-zA-Z0-9]/?.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.workspace) {
      newErrors.workspace = 'Please select a workspace option';
    }

    if (formData?.workspace === 'join' && !formData?.invitationCode?.trim()) {
      newErrors.invitationCode = 'Invitation code is required to join a workspace';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, workspace: value }));
    if (errors?.workspace) {
      setErrors(prev => ({ ...prev, workspace: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, acceptTerms: e?.target?.checked }));
    if (errors?.acceptTerms) {
      setErrors(prev => ({ ...prev, acceptTerms: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength <= 2) return 'bg-error';
    if (passwordStrength === 3) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Medium';
    return 'Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Create Your Account</h2>
        <p className="text-sm text-muted-foreground">Get started with CollabHub in just a few steps</p>
      </div>

      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={errors?.fullName}
        required
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your work email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 p-1 hover:bg-muted rounded transition-smooth"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} color="var(--color-muted-foreground)" />
        </button>
        {formData?.password && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4]?.map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-smooth ${
                    level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength: <span className="font-medium">{getPasswordStrengthText()}</span>
            </p>
          </div>
        )}
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 p-1 hover:bg-muted rounded transition-smooth"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} color="var(--color-muted-foreground)" />
        </button>
      </div>

      <Select
        label="Workspace"
        options={workspaceOptions}
        value={formData?.workspace}
        onChange={handleSelectChange}
        placeholder="Select workspace option"
        error={errors?.workspace}
        required
      />

      {formData?.workspace === 'join' && (
        <Input
          label="Invitation Code"
          type="text"
          name="invitationCode"
          placeholder="Enter your invitation code"
          value={formData?.invitationCode}
          onChange={handleInputChange}
          error={errors?.invitationCode}
          required
        />
      )}

      <div className="space-y-2">
        <Checkbox
          label={
            <span className="text-sm text-foreground">
              I agree to the{' '}
              <button type="button" className="text-primary hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button type="button" className="text-primary hover:underline">Privacy Policy</button>
            </span>
          }
          checked={formData?.acceptTerms}
          onChange={handleCheckboxChange}
        />
        {errors?.acceptTerms && (
          <p className="text-sm text-error">{errors?.acceptTerms}</p>
        )}
      </div>

      <Button type="submit" variant="default" size="lg" fullWidth>
        Continue
      </Button>
    </form>
  );
};

export default RegistrationForm;