import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import WorkspaceSelector from './WorkspaceSelector';
import NotificationCenter from './NotificationCenter';
import UserProfileMenu from './UserProfileMenu';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/workspace-dashboard', icon: 'LayoutDashboard' },
    { label: 'Projects', path: '/project-management', icon: 'FolderKanban' },
    { label: 'Communication', path: '/team-communication', icon: 'MessageSquare' },
    { label: 'Files', path: '/file-management', icon: 'FolderOpen' },
    { label: 'Calendar', path: '/calendar-integration', icon: 'Calendar' },
    { label: 'Video', path: '/video-conference', icon: 'Video' },
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[60px] bg-card shadow-warm-sm z-1000">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/workspace-dashboard" className="flex items-center gap-3 transition-smooth hover:opacity-80">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Layers" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground">CollabHub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md transition-smooth
                    ${isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="font-caption font-medium text-sm">{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <WorkspaceSelector />
            <NotificationCenter />
            <UserProfileMenu />

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
              aria-label="Toggle mobile menu"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background z-1300 md:hidden"
          style={{ top: '60px' }}
        >
          <nav className="flex flex-col p-6 gap-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-md transition-smooth
                  ${isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-caption font-medium">{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
      {/* Spacer for fixed header */}
      <div className="h-[60px]" />
    </>
  );
};

export default Header;