import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/navigation/Header';
import ActivityFeedItem from './components/ActivityFeedItem';
import StatCard from './components/StatCard';
import QuickActionButton from './components/QuickActionButton';
import WidgetCard from './components/WidgetCard';
import CalendarWidget from './components/CalendarWidget';
import RecentDocuments from './components/RecentDocuments';
import ActiveProjects from './components/ActiveProjects';
import TeamDirectory from './components/TeamDirectory';
import SearchBar from './components/SearchBar';

const WorkspaceDashboard = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const mockActivities = [
    {
      id: 1,
      type: 'message',
      userName: 'Sarah Chen',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
      userAvatarAlt: 'Professional headshot of Asian woman with long black hair wearing white blouse',
      description: 'Commented on Website Redesign project',
      context: 'View in Projects',
      timestamp: '5 min ago'
    },
    {
      id: 2,
      type: 'file',
      userName: 'Alex Morgan',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1aef10a9f-1763294632369.png",
      userAvatarAlt: 'Professional headshot of Caucasian man with short brown hair in navy suit',
      description: 'Uploaded Design System v2.0.fig to shared files',
      context: 'Open File',
      timestamp: '15 min ago'
    },
    {
      id: 3,
      type: 'project',
      userName: 'Jordan Lee',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1837cc2b9-1763297271592.png",
      userAvatarAlt: 'Professional headshot of African American woman with curly hair wearing blue blazer',
      description: 'Completed milestone: Q1 Budget Planning',
      context: 'View Project',
      timestamp: '1 hour ago'
    },
    {
      id: 4,
      type: 'meeting',
      userName: 'Michael Rodriguez',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1569e76bf-1763295587761.png",
      userAvatarAlt: 'Professional headshot of Hispanic man with short black hair in gray suit',
      description: 'Scheduled Team Sync Meeting for today at 10:00 AM',
      context: 'View Calendar',
      timestamp: '2 hours ago'
    },
    {
      id: 5,
      type: 'task',
      userName: 'Emma Wilson',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc1f2fd2-1763297375501.png",
      userAvatarAlt: 'Professional headshot of Caucasian woman with blonde hair in black blazer',
      description: 'Assigned you a new task: Review marketing materials',
      context: 'View Task',
      timestamp: '3 hours ago'
    },
    {
      id: 6,
      type: 'mention',
      userName: 'David Kim',
      userAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18142c6fb-1763296479151.png",
      userAvatarAlt: 'Professional headshot of Asian man with short black hair in blue shirt',
      description: 'Mentioned you in Mobile App Development discussion',
      context: 'View Discussion',
      timestamp: '4 hours ago'
    }];


    setActivities(mockActivities);

    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        type: 'message',
        userName: 'System',
        description: 'New activity detected',
        timestamp: 'Just now'
      };
      setActivities((prev) => [newActivity, ...prev]?.slice(0, 10));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
  {
    title: 'Unread Messages',
    value: '24',
    icon: 'MessageSquare',
    trend: 'up',
    trendValue: '+12% from yesterday',
    color: 'primary'
  },
  {
    title: 'Pending Tasks',
    value: '8',
    icon: 'CheckSquare',
    trend: 'down',
    trendValue: '-3 from last week',
    color: 'warning'
  },
  {
    title: 'Upcoming Meetings',
    value: '3',
    icon: 'Calendar',
    trend: 'neutral',
    trendValue: 'Today',
    color: 'accent'
  },
  {
    title: 'Active Projects',
    value: '5',
    icon: 'FolderKanban',
    trend: 'up',
    trendValue: '+1 this month',
    color: 'success'
  }];


  const handleCreateProject = () => {
    navigate('/project-management');
  };

  const handleStartVideoCall = () => {
    navigate('/team-communication');
  };

  const handleAccessFiles = () => {
    navigate('/file-management');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Top Section - Search and Quick Actions */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="w-full lg:w-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
              Welcome back, Alex
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Here's what's happening in your workspace today
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none min-w-0">
              <SearchBar />
            </div>
            <div className="flex items-center gap-2">
              <QuickActionButton
                label="New Project"
                icon="Plus"
                onClick={handleCreateProject}
                variant="default" />

              <QuickActionButton
                label="Video Call"
                icon="Video"
                onClick={handleStartVideoCall}
                variant="secondary" />

              <QuickActionButton
                label="Files"
                icon="FolderOpen"
                onClick={handleAccessFiles}
                variant="outline" />

            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {stats?.map((stat, index) =>
          <StatCard key={index} {...stat} />
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Activity Feed */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <WidgetCard title="Recent Activity" icon="Activity" collapsible>
              <div className="space-y-1 max-h-[600px] overflow-y-auto">
                {activities?.map((activity) =>
                <ActivityFeedItem key={activity?.id} activity={activity} />
                )}
              </div>
            </WidgetCard>

            <WidgetCard title="Active Projects" icon="FolderKanban" collapsible>
              <ActiveProjects />
            </WidgetCard>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-4 md:space-y-6">
            <WidgetCard title="Upcoming Events" icon="Calendar" collapsible>
              <CalendarWidget />
            </WidgetCard>

            <WidgetCard title="Recent Documents" icon="FileText" collapsible>
              <RecentDocuments />
            </WidgetCard>

            <WidgetCard title="Team Directory" icon="Users" collapsible>
              <TeamDirectory />
            </WidgetCard>
          </div>
        </div>

        {/* Mobile-only Quick Access */}
        <div className="lg:hidden mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/project-management')}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg shadow-warm hover:shadow-warm-md transition-smooth">

            <Icon name="FolderKanban" size={32} color="var(--color-primary)" />
            <span className="text-sm font-caption font-medium text-foreground">Projects</span>
          </button>
          <button
            onClick={() => navigate('/team-communication')}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg shadow-warm hover:shadow-warm-md transition-smooth">

            <Icon name="MessageSquare" size={32} color="var(--color-primary)" />
            <span className="text-sm font-caption font-medium text-foreground">Messages</span>
          </button>
          <button
            onClick={() => navigate('/file-management')}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg shadow-warm hover:shadow-warm-md transition-smooth">

            <Icon name="FolderOpen" size={32} color="var(--color-primary)" />
            <span className="text-sm font-caption font-medium text-foreground">Files</span>
          </button>
          <button
            onClick={() => navigate('/calendar-integration')}
            className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg shadow-warm hover:shadow-warm-md transition-smooth">

            <Icon name="Calendar" size={32} color="var(--color-primary)" />
            <span className="text-sm font-caption font-medium text-foreground">Calendar</span>
          </button>
        </div>
      </main>
    </div>);

};

export default WorkspaceDashboard;