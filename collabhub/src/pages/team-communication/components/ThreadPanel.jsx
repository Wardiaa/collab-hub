import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ThreadPanel = ({ thread, onClose, onSendReply }) => {
  const [replyMessage, setReplyMessage] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (replyMessage?.trim()) {
      onSendReply({
        content: replyMessage,
        threadId: thread?.id
      });
      setReplyMessage('');
    }
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="fixed lg:relative inset-y-0 right-0 z-1100 w-full lg:w-96 bg-card border-l border-border flex flex-col"
      style={{ top: '60px' }}>
      {/* Header */}
      <div className="h-16 border-b border-border px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
          <h2 className="text-base font-heading font-semibold text-foreground">Thread</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-md transition-smooth"
          aria-label="Close thread"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      {/* Original Message */}
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
            <Image
              src={thread?.originalMessage?.avatar}
              alt={thread?.originalMessage?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm font-caption font-semibold text-foreground">
                {thread?.originalMessage?.senderName}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTime(thread?.originalMessage?.timestamp)}
              </span>
            </div>
            <p className="text-sm text-foreground whitespace-pre-wrap break-words">
              {thread?.originalMessage?.content}
            </p>
          </div>
        </div>
      </div>
      {/* Replies */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-xs text-muted-foreground font-caption font-medium mb-2">
          {thread?.replies?.length} {thread?.replies?.length === 1 ? 'reply' : 'replies'}
        </div>
        {thread?.replies?.map((reply) => (
          <div key={reply?.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
              <Image
                src={reply?.avatar}
                alt={reply?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-caption font-semibold text-foreground">
                  {reply?.senderName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(reply?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                {reply?.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Reply Input */}
      <form onSubmit={handleSubmit} className="border-t border-border p-4">
        <div className="flex items-end gap-2">
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e?.target?.value)}
            placeholder="Reply to thread..."
            rows={2}
            className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
          <Button
            type="submit"
            variant="default"
            size="default"
            disabled={!replyMessage?.trim()}
            iconName="Send"
            iconSize={16}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ThreadPanel;