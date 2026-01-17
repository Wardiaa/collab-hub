import React from 'react';
import Icon from '../../../components/AppIcon';

const VideoGrid = ({ participants, isScreenSharing }) => {
  const getGridClass = () => {
    if (isScreenSharing) return 'grid-cols-1';
    const count = participants?.length || 0;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      {isScreenSharing ? (
        <div className="h-full flex flex-col gap-4">
          {/* Screen Share Area */}
          <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center relative">
            <div className="text-center text-white">
              <Icon name="Monitor" size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Screen Sharing Active</p>
              <p className="text-sm text-gray-400 mt-2">Shared by Sarah Johnson</p>
            </div>
            <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-md flex items-center gap-2">
              <Icon name="Monitor" size={16} color="white" />
              <span className="text-sm text-white font-medium">Presenting</span>
            </div>
          </div>
          {/* Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {participants?.map((participant) => (
              <div key={participant?.id} className="flex-shrink-0 w-32 h-24 bg-gray-800 rounded-lg relative">
                {participant?.isVideoOff ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-1">
                      <span className="text-white font-medium text-sm">
                        {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
                )}
                <div className="absolute bottom-1 left-1 right-1 bg-black/70 px-2 py-0.5 rounded text-xs text-white truncate">
                  {participant?.name?.split(' ')?.[0]}
                </div>
                {participant?.isMuted && (
                  <div className="absolute top-1 right-1 bg-error rounded-full p-1">
                    <Icon name="MicOff" size={10} color="white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`grid ${getGridClass()} gap-4 h-full`}>
          {participants?.map((participant) => (
            <div 
              key={participant?.id} 
              className={`bg-gray-800 rounded-lg relative overflow-hidden ${
                participant?.isSpeaking ? 'ring-2 ring-primary' : ''
              }`}
            >
              {participant?.isVideoOff ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-3">
                    <span className="text-white font-heading font-semibold text-2xl">
                      {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <p className="text-white font-medium">{participant?.name}</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
              )}
              
              {/* Participant Info Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/70 px-3 py-2 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-white font-medium text-sm truncate">{participant?.name}</span>
                  {participant?.role === 'Host' && (
                    <span className="bg-accent px-2 py-0.5 rounded text-xs text-accent-foreground flex-shrink-0">
                      Host
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {participant?.isMuted && (
                    <div className="bg-error rounded-full p-1">
                      <Icon name="MicOff" size={14} color="white" />
                    </div>
                  )}
                  {participant?.isSpeaking && (
                    <div className="flex gap-0.5">
                      <div className="w-1 h-3 bg-success rounded-full animate-pulse" />
                      <div className="w-1 h-4 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1 h-3 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Connection Quality Indicator */}
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <div className="w-1 h-2 bg-success rounded-full" />
                <div className="w-1 h-3 bg-success rounded-full" />
                <div className="w-1 h-4 bg-success rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;