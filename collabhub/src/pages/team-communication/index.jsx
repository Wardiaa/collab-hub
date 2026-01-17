import React, { useState } from 'react';
import Header from '../../components/navigation/Header';
import ChannelSidebar from './components/ChannelSidebar';
import ChannelHeader from './components/ChannelHeader';
import MessageList from './components/MessageList';
import MessageComposer from './components/MessageComposer';
import ThreadPanel from './components/ThreadPanel';

const TeamCommunication = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [threadOpen, setThreadOpen] = useState(false);
  const [activeThread, setActiveThread] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  const currentUserId = 'user-1';

  const [channels] = useState([
  {
    id: 'channel-1',
    name: 'general',
    description: 'Company-wide announcements and discussions',
    isPrivate: false,
    unreadCount: 3
  },
  {
    id: 'channel-2',
    name: 'design-team',
    description: 'Design discussions and feedback',
    isPrivate: false,
    unreadCount: 0
  },
  {
    id: 'channel-3',
    name: 'project-alpha',
    description: 'Project Alpha development updates',
    isPrivate: true,
    unreadCount: 12
  },
  {
    id: 'channel-4',
    name: 'marketing',
    description: 'Marketing campaigns and strategies',
    isPrivate: false,
    unreadCount: 0
  }]
  );

  const [directMessages] = useState([
  {
    id: 'dm-1',
    name: 'Sarah Chen',
    type: 'dm',
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 'dm-2',
    name: 'Michael Rodriguez',
    type: 'dm',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 'dm-3',
    name: 'Emily Watson',
    type: 'dm',
    isOnline: true,
    unreadCount: 5
  }]
  );

  const [activeChannel, setActiveChannel] = useState(channels?.[0]);

  const [messages] = useState([
  {
    id: 'msg-1',
    senderId: 'user-2',
    senderName: 'Sarah Chen',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1995e8b9b-1763294899676.png",
    avatarAlt: 'Professional headshot of Asian woman with long black hair wearing navy blazer',
    content: 'Hey team! Just finished the Q1 design review. The new dashboard mockups are looking great. I\'ve uploaded them to the shared drive.',
    type: 'text',
    timestamp: new Date(Date.now() - 3600000),
    reactions: [
    { emoji: '👍', count: 5, hasReacted: false },
    { emoji: '🎉', count: 2, hasReacted: true }],

    threadCount: 3,
    isEdited: false
  },
  {
    id: 'msg-2',
    senderId: 'user-3',
    senderName: 'Michael Rodriguez',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143b978a3-1763294952544.png",
    avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit',
    content: 'Thanks Sarah! I\'ll review them this afternoon. Can we schedule a quick sync tomorrow to discuss the implementation timeline?',
    type: 'text',
    timestamp: new Date(Date.now() - 3000000),
    reactions: [],
    threadCount: 0,
    isEdited: false
  },
  {
    id: 'msg-3',
    senderId: 'user-1',
    senderName: 'You',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_179d3a693-1763293794639.png",
    avatarAlt: 'Professional headshot of Caucasian man with brown hair wearing gray suit',
    content: 'Absolutely! I\'m free tomorrow at 2 PM. Let\'s use the main conference room.',
    type: 'text',
    timestamp: new Date(Date.now() - 2400000),
    reactions: [
    { emoji: '✅', count: 1, hasReacted: false }],

    threadCount: 0,
    isEdited: false
  },
  {
    id: 'msg-4',
    senderId: 'user-4',
    senderName: 'Emily Watson',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16160e5cd-1763294249246.png",
    avatarAlt: 'Professional headshot of blonde woman with shoulder-length hair wearing white blouse',
    type: 'file',
    fileName: 'Q1_Design_Specifications.pdf',
    fileSize: '2.4 MB',
    timestamp: new Date(Date.now() - 1800000),
    reactions: [],
    threadCount: 0,
    isEdited: false
  },
  {
    id: 'msg-5',
    senderId: 'user-2',
    senderName: 'Sarah Chen',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1995e8b9b-1763294899676.png",
    avatarAlt: 'Professional headshot of Asian woman with long black hair wearing navy blazer',
    type: 'image',
    imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1cd7345e3-1766070002920.png",
    imageAlt: 'Modern office workspace with multiple computer monitors displaying colorful design mockups and UI elements',
    timestamp: new Date(Date.now() - 1200000),
    reactions: [
    { emoji: '🔥', count: 8, hasReacted: true },
    { emoji: '👏', count: 4, hasReacted: false }],

    threadCount: 0,
    isEdited: false
  },
  {
    id: 'msg-6',
    senderId: 'user-5',
    senderName: 'David Kim',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11a2a08ae-1763295050712.png",
    avatarAlt: 'Professional headshot of Asian man with glasses wearing dark blue shirt',
    type: 'code',
    language: 'JavaScript',
    code: `const handleSubmit = async (data) => {\n  try {\n    const response = await api.post('/submit', data);\n    console.log('Success:', response);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n};`,
    timestamp: new Date(Date.now() - 600000),
    reactions: [
    { emoji: '💯', count: 3, hasReacted: false }],

    threadCount: 2,
    isEdited: false
  },
  {
    id: 'msg-7',
    senderId: 'user-3',
    senderName: 'Michael Rodriguez',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143b978a3-1763294952544.png",
    avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit',
    content: 'Perfect! That code snippet looks clean. I\'ll integrate it into the main branch today.',
    type: 'text',
    timestamp: new Date(Date.now() - 300000),
    reactions: [],
    threadCount: 0,
    isEdited: false
  }]
  );

  const handleChannelSelect = (channel) => {
    setActiveChannel(channel);
    setSidebarOpen(false);
  };

  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);
  };

  const handleReaction = (messageId, emoji) => {
    console.log('Adding reaction:', messageId, emoji);
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const handleStartThread = (messageId) => {
    const message = messages?.find((m) => m?.id === messageId);
    if (message) {
      setActiveThread({
        id: messageId,
        originalMessage: message,
        replies: [
        {
          id: 'reply-1',
          senderId: 'user-3',
          senderName: 'Michael Rodriguez',
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143b978a3-1763294952544.png",
          avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit',
          content: 'Great point! I agree with this approach.',
          timestamp: new Date(Date.now() - 120000)
        },
        {
          id: 'reply-2',
          senderId: 'user-4',
          senderName: 'Emily Watson',
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16160e5cd-1763294249246.png",
          avatarAlt: 'Professional headshot of blonde woman with shoulder-length hair wearing white blouse',
          content: 'Let me know if you need any help with implementation.',
          timestamp: new Date(Date.now() - 60000)
        }]

      });
      setThreadOpen(true);
    }
  };

  const handleSendThreadReply = (replyData) => {
    console.log('Sending thread reply:', replyData);
  };

  const handleStartVideoCall = () => {
    console.log('Starting video call for channel:', activeChannel?.name);
  };

  const handleSearch = (query) => {
    console.log('Searching messages:', query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-60px)]">
        {/* Channel Sidebar */}
        <ChannelSidebar
          channels={channels}
          directMessages={directMessages}
          activeChannel={activeChannel}
          onChannelSelect={handleChannelSelect}
          onCreateChannel={() => console.log('Create channel')}
          isMobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)} />


        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChannelHeader
            channel={activeChannel}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onStartVideoCall={handleStartVideoCall}
            onSearch={handleSearch} />


          <MessageList
            messages={messages}
            onReaction={handleReaction}
            onReply={handleReply}
            onStartThread={handleStartThread}
            currentUserId={currentUserId} />


          <MessageComposer
            onSendMessage={handleSendMessage}
            replyingTo={replyingTo}
            onCancelReply={() => setReplyingTo(null)} />

        </div>

        {/* Thread Panel */}
        {threadOpen && activeThread &&
        <ThreadPanel
          thread={activeThread}
          onClose={() => setThreadOpen(false)}
          onSendReply={handleSendThreadReply} />

        }
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen &&
      <div
        className="fixed inset-0 bg-background/80 z-1000 lg:hidden"
        onClick={() => setSidebarOpen(false)}
        style={{ top: '60px' }} />

      }
    </div>);

};

export default TeamCommunication;