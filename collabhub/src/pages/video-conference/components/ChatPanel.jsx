import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatPanel = ({ messages, onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages || []);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (newMessage?.trim()) {
      const message = {
        id: chatMessages?.length + 1,
        sender: 'You',
        message: newMessage,
        timestamp: new Date()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-foreground">Meeting Chat</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-smooth"
        >
          <Icon name="X" size={18} color="var(--color-muted-foreground)" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages?.map((msg) => (
          <div key={msg?.id} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{msg?.sender}</span>
              <span className="text-xs text-muted-foreground">{msg?.timestamp}</span>
            </div>
            <div className="bg-muted px-3 py-2 rounded-lg">
              <p className="text-sm text-foreground">{msg?.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e?.target?.value)}
            className="flex-1 h-10 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!newMessage?.trim()}
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;