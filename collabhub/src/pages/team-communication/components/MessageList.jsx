import React, { useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageList = ({ messages, onReaction, onReply, onStartThread, currentUserId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate?.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) {
      return messageDate?.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return messageDate?.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  const renderMessageContent = (message) => {
    if (message?.type === 'text') {
      return (
        <p className="text-sm text-foreground whitespace-pre-wrap break-words">
          {message?.content}
        </p>
      );
    }

    if (message?.type === 'file') {
      return (
        <div className="flex items-center gap-3 p-3 bg-muted rounded-md border border-border">
          <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-caption font-medium text-foreground truncate">
              {message?.fileName}
            </p>
            <p className="text-xs text-muted-foreground">{message?.fileSize}</p>
          </div>
          <button className="p-2 hover:bg-background rounded transition-smooth">
            <Icon name="Download" size={16} />
          </button>
        </div>
      );
    }

    if (message?.type === 'image') {
      return (
        <div className="max-w-sm rounded-md overflow-hidden border border-border">
          <Image
            src={message?.imageUrl}
            alt={message?.imageAlt}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    }

    if (message?.type === 'code') {
      return (
        <div className="bg-muted rounded-md border border-border overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-background border-b border-border">
            <span className="text-xs font-caption font-medium text-muted-foreground">
              {message?.language || 'Code'}
            </span>
            <button className="p-1 hover:bg-muted rounded transition-smooth">
              <Icon name="Copy" size={14} />
            </button>
          </div>
          <pre className="p-3 text-xs font-mono text-foreground overflow-x-auto">
            <code>{message?.code}</code>
          </pre>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
      {messages?.map((message) => {
        const isCurrentUser = message?.senderId === currentUserId;
        
        return (
          <div key={message?.id} className="group">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                <Image
                  src={message?.avatar}
                  alt={message?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-caption font-semibold text-foreground">
                    {message?.senderName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message?.timestamp)}
                  </span>
                  {message?.isEdited && (
                    <span className="text-xs text-muted-foreground">(edited)</span>
                  )}
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  {renderMessageContent(message)}

                  {/* Reactions */}
                  {message?.reactions && message?.reactions?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message?.reactions?.map((reaction, index) => (
                        <button
                          key={index}
                          onClick={() => onReaction(message?.id, reaction?.emoji)}
                          className={`
                            flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-smooth
                            ${reaction?.hasReacted
                              ? 'bg-primary/20 border border-primary' :'bg-muted border border-border hover:bg-muted/80'
                            }
                          `}
                        >
                          <span>{reaction?.emoji}</span>
                          <span className="font-caption font-medium">{reaction?.count}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => onReaction(message?.id)}
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-muted border border-border hover:bg-muted/80 transition-smooth"
                        aria-label="Add reaction"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                  )}

                  {/* Thread Replies */}
                  {message?.threadCount > 0 && (
                    <button
                      onClick={() => onStartThread(message?.id)}
                      className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-smooth mt-2"
                    >
                      <Icon name="MessageSquare" size={14} />
                      <span className="font-caption font-medium">
                        {message?.threadCount} {message?.threadCount === 1 ? 'reply' : 'replies'}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="opacity-0 group-hover:opacity-100 transition-smooth flex items-center gap-1">
                <button
                  onClick={() => onReaction(message?.id)}
                  className="p-1.5 hover:bg-muted rounded transition-smooth"
                  aria-label="Add reaction"
                >
                  <Icon name="Smile" size={16} />
                </button>
                <button
                  onClick={() => onReply(message)}
                  className="p-1.5 hover:bg-muted rounded transition-smooth"
                  aria-label="Reply"
                >
                  <Icon name="Reply" size={16} />
                </button>
                <button
                  className="p-1.5 hover:bg-muted rounded transition-smooth"
                  aria-label="More options"
                >
                  <Icon name="MoreVertical" size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;