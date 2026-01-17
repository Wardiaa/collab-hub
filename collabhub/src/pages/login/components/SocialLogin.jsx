import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = () => {
  const handleGoogleLogin = () => {
    console.log('Google login initiated');
  };

  const handleMicrosoftLogin = () => {
    console.log('Microsoft login initiated');
  };

  return (
    <div className="w-full space-y-3 md:space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs md:text-sm uppercase">
          <span className="bg-card px-2 md:px-3 text-muted-foreground font-caption">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="default"
          onClick={handleGoogleLogin}
          iconName="Chrome"
          iconPosition="left"
          iconSize={18}
          fullWidth
        >
          Google
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={handleMicrosoftLogin}
          iconName="Box"
          iconPosition="left"
          iconSize={18}
          fullWidth
        >
          Microsoft
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;