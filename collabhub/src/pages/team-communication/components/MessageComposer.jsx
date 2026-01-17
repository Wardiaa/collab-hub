import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageComposer = ({ onSendMessage, replyingTo, onCancelReply }) => {
  const [message, setMessage] = useState('');
  const [showFormatting, setShowFormatting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '👏', '✅', '💯', '🚀'];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim()) {
      onSendMessage({
        content: message,
        type: 'text',
        replyTo: replyingTo?.id
      });
      setMessage('');
      if (replyingTo) {
        onCancelReply();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const insertFormatting = (format) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const selectedText = message?.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'codeblock':
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
        break;
      default:
        formattedText = selectedText;
    }

    const newMessage = message?.substring(0, start) + formattedText + message?.substring(end);
    setMessage(newMessage);
    
    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + formattedText?.length, start + formattedText?.length);
    }, 0);
  };

  const insertEmoji = (emoji) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const newMessage = message?.substring(0, start) + emoji + message?.substring(start);
    setMessage(newMessage);
    setShowEmojiPicker(false);
    
    setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + emoji?.length, start + emoji?.length);
    }, 0);
  };

  const handleFileUpload = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onSendMessage({
        type: 'file',
        fileName: file?.name,
        fileSize: `${(file?.size / 1024)?.toFixed(1)} KB`,
        file: file
      });
      e.target.value = '';
    }
  };

  return (
    <div className="border-t border-border bg-card">
      {/* Reply Preview */}
      {replyingTo && (
        <div className="px-4 md:px-6 py-2 bg-muted border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Icon name="Reply" size={14} className="text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Replying to</span>
              <span className="text-xs font-caption font-semibold text-foreground truncate">
                {replyingTo?.senderName}
              </span>
            </div>
            <button
              onClick={onCancelReply}
              className="p-1 hover:bg-background rounded transition-smooth"
              aria-label="Cancel reply"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      )}
      {/* Formatting Toolbar */}
      {showFormatting && (
        <div className="px-4 md:px-6 py-2 border-b border-border">
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => insertFormatting('bold')}
              className="p-2 hover:bg-muted rounded transition-smooth"
              aria-label="Bold"
            >
              <Icon name="Bold" size={16} />
            </button>
            <button
              onClick={() => insertFormatting('italic')}
              className="p-2 hover:bg-muted rounded transition-smooth"
              aria-label="Italic"
            >
              <Icon name="Italic" size={16} />
            </button>
            <button
              onClick={() => insertFormatting('code')}
              className="p-2 hover:bg-muted rounded transition-smooth"
              aria-label="Inline code"
            >
              <Icon name="Code" size={16} />
            </button>
            <button
              onClick={() => insertFormatting('codeblock')}
              className="p-2 hover:bg-muted rounded transition-smooth"
              aria-label="Code block"
            >
              <Icon name="FileCode" size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="px-4 md:px-6 py-2 border-b border-border">
          <div className="flex items-center gap-2 flex-wrap">
            {emojis?.map((emoji, index) => (
              <button
                key={index}
                onClick={() => insertEmoji(emoji)}
                className="text-xl p-1 hover:bg-muted rounded transition-smooth"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 md:p-6">
        <div className="flex items-end gap-2">
          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-3 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none min-h-[44px] max-h-32"
              style={{ 
                height: 'auto',
                minHeight: '44px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e?.target?.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowFormatting(!showFormatting)}
              className={`
                p-2 rounded transition-smooth hidden sm:block
                ${showFormatting ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
              `}
              aria-label="Toggle formatting"
            >
              <Icon name="Type" size={20} />
            </button>
            
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`
                p-2 rounded transition-smooth
                ${showEmojiPicker ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
              `}
              aria-label="Toggle emoji picker"
            >
              <Icon name="Smile" size={20} />
            </button>

            <button
              type="button"
              onClick={handleFileUpload}
              className="p-2 hover:bg-muted rounded transition-smooth"
              aria-label="Attach file"
            >
              <Icon name="Paperclip" size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              type="submit"
              variant="default"
              size="default"
              disabled={!message?.trim()}
              iconName="Send"
              iconSize={18}
              className="ml-1"
            >
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageComposer;