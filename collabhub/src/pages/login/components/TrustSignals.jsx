import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    { icon: 'Shield', label: '256-bit SSL Encryption' },
    { icon: 'Lock', label: 'GDPR Compliant' },
    { icon: 'CheckCircle', label: 'SOC 2 Certified' }
  ];

  return (
    <div className="w-full space-y-4 md:space-y-5">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Icon name={feature?.icon} size={16} color="var(--color-success)" />
            <span className="text-xs md:text-sm text-muted-foreground font-caption">{feature?.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
        <button className="hover:text-primary transition-smooth font-caption">Privacy Policy</button>
        <span className="text-border">•</span>
        <button className="hover:text-primary transition-smooth font-caption">Terms of Service</button>
        <span className="text-border">•</span>
        <button className="hover:text-primary transition-smooth font-caption">Security</button>
      </div>
    </div>
  );
};

export default TrustSignals;