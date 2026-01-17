import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ParticipantList = ({ participants, onClose }) => {
  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Users" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-foreground">
            Participants ({participants?.length})
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-smooth"
        >
          <Icon name="X" size={18} color="var(--color-muted-foreground)" />
        </button>
      </div>

      {/* Participants List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {participants?.map((participant) => (
          <div
            key={participant?.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-smooth"
          >
            {/* Avatar */}
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">
                {participant?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>

            {/* Participant Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {participant?.name}
                </p>
                {participant?.role === 'Host' && (
                  <span className="bg-accent px-2 py-0.5 rounded text-xs text-accent-foreground flex-shrink-0">
                    Host
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                {participant?.isMuted ? (
                  <Icon name="MicOff" size={12} color="var(--color-error)" />
                ) : (
                  <Icon name="Mic" size={12} color="var(--color-success)" />
                )}
                {participant?.isVideoOff ? (
                  <Icon name="VideoOff" size={12} color="var(--color-error)" />
                ) : (
                  <Icon name="Video" size={12} color="var(--color-success)" />
                )}
                {participant?.isSpeaking && (
                  <span className="text-xs text-success font-medium">Speaking</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <button className="p-2 hover:bg-muted rounded transition-smooth">
              <Icon name="MoreVertical" size={16} color="var(--color-muted-foreground)" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="outline" size="sm" fullWidth iconName="UserPlus">
          Invite Participants
        </Button>
        <Button variant="outline" size="sm" fullWidth iconName="Link">
          Copy Meeting Link
        </Button>
      </div>
    </div>
  );
};

export default ParticipantList;