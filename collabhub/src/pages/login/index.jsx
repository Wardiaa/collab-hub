import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import WorkspaceSelector from './components/WorkspaceSelector';
import TrustSignals from './components/TrustSignals';
import BrandingSection from './components/BrandingSection';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <BrandingSection />
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Layers" size={24} color="var(--color-primary-foreground)" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">CollabHub</h1>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
              Welcome back
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Sign in to your workspace to continue collaborating with your team
            </p>
          </div>

          <div className="bg-card rounded-lg md:rounded-xl shadow-warm-md p-6 md:p-8 space-y-6">
            <WorkspaceSelector />
            <LoginForm />
            <SocialLogin />
          </div>

          <TrustSignals />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/registration" className="font-caption font-medium text-primary hover:text-primary/80 transition-smooth">
                Create workspace
              </Link>
            </p>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} CollabHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;