import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ChannelSidebar = ({ 
  channels, 
  directMessages, 
  activeChannel, 
  onChannelSelect, 
  onCreateChannel,
  isMobileOpen,
  onMobileClose 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels?.filter(channel =>
    channel?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const filteredDMs = directMessages?.filter(dm =>
    dm?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className={`
      fixed lg:relative inset-y-0 left-0 z-1100
      w-64 lg:w-72 bg-card border-r border-border
      transform transition-transform duration-300
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}
    style={{ top: '60px' }}>
      <div className="h-full flex flex-col">
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">Channels</h2>
          <button
            onClick={onMobileClose}
            className="p-2 hover:bg-muted rounded-md transition-smooth"
            aria-label="Close sidebar"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto">
          {/* Channels Section */}
          <div className="p-2">
            <div className="flex items-center justify-between px-2 py-2">
              <h3 className="text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wide">
                Channels
              </h3>
              <button
                onClick={onCreateChannel}
                className="p-1 hover:bg-muted rounded transition-smooth"
                aria-label="Create channel"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
            <div className="space-y-1">
              {filteredChannels?.map((channel) => (
                <button
                  key={channel?.id}
                  onClick={() => {
                    onChannelSelect(channel);
                    onMobileClose();
                  }}
                  className={`
                    w-full flex items-center gap-2 px-2 py-2 rounded-md transition-smooth
                    ${activeChannel?.id === channel?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={channel?.isPrivate ? 'Lock' : 'Hash'} 
                    size={16} 
                  />
                  <span className="flex-1 text-left text-sm font-caption font-medium truncate">
                    {channel?.name}
                  </span>
                  {channel?.unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-error text-error-foreground text-xs font-caption font-medium rounded-full min-w-[20px] text-center">
                      {channel?.unreadCount > 99 ? '99+' : channel?.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div className="p-2 border-t border-border">
            <div className="flex items-center justify-between px-2 py-2">
              <h3 className="text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wide">
                Direct Messages
              </h3>
              <button
                className="p-1 hover:bg-muted rounded transition-smooth"
                aria-label="New direct message"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
            <div className="space-y-1">
              {filteredDMs?.map((dm) => (
                <button
                  key={dm?.id}
                  onClick={() => {
                    onChannelSelect(dm);
                    onMobileClose();
                  }}
                  className={`
                    w-full flex items-center gap-2 px-2 py-2 rounded-md transition-smooth
                    ${activeChannel?.id === dm?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={14} />
                    </div>
                    {dm?.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-success rounded-full border border-card" />
                    )}
                  </div>
                  <span className="flex-1 text-left text-sm font-caption font-medium truncate">
                    {dm?.name}
                  </span>
                  {dm?.unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-error text-error-foreground text-xs font-caption font-medium rounded-full min-w-[20px] text-center">
                      {dm?.unreadCount > 99 ? '99+' : dm?.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelSidebar;