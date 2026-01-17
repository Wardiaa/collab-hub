import React, { useState } from 'react';
import Header from '../../components/navigation/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VideoGrid from './components/VideoGrid';
import MeetingControls from './components/MeetingControls';
import ChatPanel from './components/ChatPanel';
import ParticipantList from './components/ParticipantList';

const VideoConference = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const mockParticipants = [
    { id: 1, name: 'Sarah Johnson', role: 'Host', isMuted: false, isVideoOff: false, isSpeaking: true },
    { id: 2, name: 'Michael Chen', role: 'Participant', isMuted: false, isVideoOff: false, isSpeaking: false },
    { id: 3, name: 'Emily Davis', role: 'Participant', isMuted: true, isVideoOff: false, isSpeaking: false },
    { id: 4, name: 'James Wilson', role: 'Participant', isMuted: false, isVideoOff: true, isSpeaking: false },
    { id: 5, name: 'Lisa Anderson', role: 'Participant', isMuted: false, isVideoOff: false, isSpeaking: false },
  ];

  const mockMessages = [
    { id: 1, sender: 'Sarah Johnson', message: 'Welcome everyone to today\'s meeting!', timestamp: '10:30 AM' },
    { id: 2, sender: 'Michael Chen', message: 'Thanks for having us!', timestamp: '10:31 AM' },
    { id: 3, sender: 'Emily Davis', message: 'Can everyone see the screen?', timestamp: '10:32 AM' },
  ];

  const meetingInfo = {
    title: 'Team Sync - Q1 Planning',
    duration: '00:45:23',
    participants: mockParticipants?.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="h-[calc(100vh-60px)] flex flex-col">
        {/* Meeting Header */}
        <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-heading font-semibold text-foreground">{meetingInfo?.title}</h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  {meetingInfo?.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Users" size={14} />
                  {meetingInfo?.participants} participants
                </span>
                {isRecording && (
                  <span className="flex items-center gap-1 text-error">
                    <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
                    Recording
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button variant="destructive" size="sm" iconName="PhoneOff">
            Leave Meeting
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Grid Area */}
          <div className="flex-1 flex flex-col bg-gray-900">
            <VideoGrid 
              participants={mockParticipants} 
              isScreenSharing={isScreenSharing}
            />
            <MeetingControls
              isMuted={isMuted}
              isVideoOff={isVideoOff}
              isScreenSharing={isScreenSharing}
              isRecording={isRecording}
              onToggleMute={() => setIsMuted(!isMuted)}
              onToggleVideo={() => setIsVideoOff(!isVideoOff)}
              onToggleScreenShare={() => setIsScreenSharing(!isScreenSharing)}
              onToggleRecording={() => setIsRecording(!isRecording)}
              onToggleChat={() => setIsChatOpen(!isChatOpen)}
              onToggleParticipants={() => setIsParticipantsOpen(!isParticipantsOpen)}
              isChatOpen={isChatOpen}
              isParticipantsOpen={isParticipantsOpen}
            />
          </div>

          {/* Chat Panel */}
          {isChatOpen && (
            <ChatPanel 
              messages={mockMessages}
              onClose={() => setIsChatOpen(false)}
            />
          )}

          {/* Participant List */}
          {isParticipantsOpen && (
            <ParticipantList 
              participants={mockParticipants}
              onClose={() => setIsParticipantsOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoConference;