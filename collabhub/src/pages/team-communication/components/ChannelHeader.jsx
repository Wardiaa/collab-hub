import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const ChannelHeader = ({ channel, onToggleSidebar, onStartVideoCall, onSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="h-16 border-b border-border bg-card px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-muted rounded-md transition-smooth"
          aria-label="Toggle sidebar"
        >
          <Icon name="Menu" size={20} />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <Icon 
            name={channel?.isPrivate ? 'Lock' : channel?.type === 'dm' ? 'User' : 'Hash'} 
            size={20} 
            className="text-muted-foreground flex-shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-base md:text-lg font-heading font-semibold text-foreground truncate">
              {channel?.name || 'Select a channel'}
            </h1>
            {channel?.description && (
              <p className="text-xs text-muted-foreground truncate hidden sm:block">
                {channel?.description}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {showSearch ? (
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Search messages..."
              autoFocus
              className="w-48 md:w-64 px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
              className="p-2 hover:bg-muted rounded-md transition-smooth"
              aria-label="Close search"
            >
              <Icon name="X" size={18} />
            </button>
          </form>
        ) : (
          <>
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-muted rounded-md transition-smooth"
              aria-label="Search messages"
            >
              <Icon name="Search" size={18} />
            </button>

            <button
              onClick={onStartVideoCall}
              className="p-2 hover:bg-muted rounded-md transition-smooth hidden sm:block"
              aria-label="Start video call"
            >
              <Icon name="Video" size={18} />
            </button>

            <button
              className="p-2 hover:bg-muted rounded-md transition-smooth hidden md:block"
              aria-label="Channel settings"
            >
              <Icon name="Settings" size={18} />
            </button>

            <button
              className="p-2 hover:bg-muted rounded-md transition-smooth"
              aria-label="More options"
            >
              <Icon name="MoreVertical" size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChannelHeader;