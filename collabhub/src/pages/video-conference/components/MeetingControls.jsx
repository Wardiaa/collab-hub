import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MeetingControls = ({
  isMuted,
  isVideoOff,
  isScreenSharing,
  isRecording,
  isChatOpen,
  isParticipantsOpen,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onToggleRecording,
  onToggleChat,
  onToggleParticipants,
}) => {
  return (
    <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant={isMuted ? 'danger' : 'secondary'}
            size="icon"
            onClick={onToggleMute}
            className="w-12 h-12 rounded-full"
          >
            <Icon name={isMuted ? 'MicOff' : 'Mic'} size={20} color="white" />
          </Button>
          <Button
            variant={isVideoOff ? 'danger' : 'secondary'}
            size="icon"
            onClick={onToggleVideo}
            className="w-12 h-12 rounded-full"
          >
            <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={20} color="white" />
          </Button>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant={isScreenSharing ? 'default' : 'secondary'}
            size="sm"
            onClick={onToggleScreenShare}
            iconName="Monitor"
            className="hidden md:flex"
          >
            {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
          </Button>
          <Button
            variant={isRecording ? 'danger' : 'secondary'}
            size="sm"
            onClick={onToggleRecording}
            className="hidden md:flex"
          >
            <div className="flex items-center gap-2">
              {isRecording && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
              <Icon name="Circle" size={16} color="white" />
              <span>{isRecording ? 'Stop Recording' : 'Record'}</span>
            </div>
          </Button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant={isParticipantsOpen ? 'default' : 'secondary'}
            size="icon"
            onClick={onToggleParticipants}
            className="w-12 h-12 rounded-full relative"
          >
            <Icon name="Users" size={20} color="white" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              5
            </span>
          </Button>
          <Button
            variant={isChatOpen ? 'default' : 'secondary'}
            size="icon"
            onClick={onToggleChat}
            className="w-12 h-12 rounded-full relative"
          >
            <Icon name="MessageSquare" size={20} color="white" />
            <span className="absolute -top-1 -right-1 bg-error text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="w-12 h-12 rounded-full"
          >
            <Icon name="MoreVertical" size={20} color="white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingControls;