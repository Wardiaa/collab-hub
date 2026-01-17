import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps?.map((step, index) => (
        <React.Fragment key={step?.number}>
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                step?.number < currentStep
                  ? 'bg-success text-white'
                  : step?.number === currentStep
                  ? 'bg-primary text-white' :'bg-muted text-muted-foreground'
              }`}
            >
              {step?.number < currentStep ? (
                <Icon name="Check" size={20} />
              ) : (
                <span className="font-heading font-semibold">{step?.number}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p
                className={`text-sm font-medium ${
                  step?.number === currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.title}
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">{step?.description}</p>
            </div>
          </div>
          {index < steps?.length - 1 && (
            <div
              className={`h-0.5 flex-1 mx-2 transition-smooth ${
                step?.number < currentStep ? 'bg-success' : 'bg-muted'
              }`}
              style={{ marginTop: '-2rem' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;