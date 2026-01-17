import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BrandingSection = () => {
  const features = [
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Work together seamlessly across projects and departments'
    },
    {
      icon: 'Zap',
      title: 'Real-time Updates',
      description: 'Stay synchronized with instant notifications and live changes'
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance for your peace of mind'
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:p-12 xl:p-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="max-w-lg space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Layers" size={28} color="var(--color-primary-foreground)" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground">CollabHub</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Your unified workspace for seamless team collaboration, project management, and communication.
          </p>
        </div>

        <div className="space-y-6">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-heading font-semibold text-foreground">{feature?.title}</h3>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4]?.map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-card overflow-hidden bg-primary/10">
                  <Image
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i * 10}.jpg`}
                    alt={`Professional headshot of team member ${i} with warm smile in business attire`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-caption font-semibold text-foreground">Join 50,000+ teams</p>
              <p className="text-xs text-muted-foreground">Trusted by organizations worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection;