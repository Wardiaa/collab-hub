import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({ label, icon, onClick, variant = 'default' }) => {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border-2 border-border text-foreground hover:bg-muted',
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-md transition-smooth
        font-caption font-medium text-sm
        ${variantClasses?.[variant]}
      `}
    >
      <Icon name={icon} size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default QuickActionButton;