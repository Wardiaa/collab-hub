import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import ProgressIndicator from './components/ProgressIndicator';
import VerificationStep from './components/VerificationStep';
import ProfileSetup from './components/ProfileSetup';

const Registration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    password: '',
    workspace: '',
    invitationCode: '',
    acceptTerms: false,
  });

  const steps = [
    { number: 1, title: 'Account Details', description: 'Create your account' },
    { number: 2, title: 'Verification', description: 'Verify your email' },
    { number: 3, title: 'Profile Setup', description: 'Complete your profile' },
  ];

  const handleStepComplete = (data) => {
    setRegistrationData({ ...registrationData, ...data });
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/workspace-dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/login" className="flex items-center gap-3 transition-smooth hover:opacity-80">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Layers" size={24} color="var(--color-primary)" />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">CollabHub</span>
          </Link>
          <Link 
            to="/login" 
            className="text-sm font-caption font-medium text-muted-foreground hover:text-foreground transition-smooth"
          >
            Already have an account? <span className="text-primary">Sign in</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <ProgressIndicator steps={steps} currentStep={currentStep} />

          {/* Step Content */}
          <div className="bg-card rounded-xl shadow-warm-md p-6 md:p-8 mt-8">
            {currentStep === 1 && (
              <RegistrationForm 
                data={registrationData}
                onComplete={handleStepComplete}
              />
            )}
            {currentStep === 2 && (
              <VerificationStep 
                email={registrationData?.email}
                onComplete={handleStepComplete}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <ProfileSetup 
                data={registrationData}
                onComplete={handleStepComplete}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our{' '}
              <button className="text-primary hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;