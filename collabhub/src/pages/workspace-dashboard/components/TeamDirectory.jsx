import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamDirectory = () => {
  const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    status: "online",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
    avatarAlt: "Professional headshot of Asian woman with long black hair wearing white blouse"
  },
  {
    id: 2,
    name: "Alex Morgan",
    role: "Lead Designer",
    status: "online",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1aef10a9f-1763294632369.png",
    avatarAlt: "Professional headshot of Caucasian man with short brown hair in navy suit"
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "Developer",
    status: "away",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1837cc2b9-1763297271592.png",
    avatarAlt: "Professional headshot of African American woman with curly hair wearing blue blazer"
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "Marketing Lead",
    status: "offline",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1569e76bf-1763295587761.png",
    avatarAlt: "Professional headshot of Hispanic man with short black hair in gray suit"
  }];


  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-success',
      away: 'bg-warning',
      offline: 'bg-muted-foreground'
    };
    return colors?.[status] || 'bg-muted-foreground';
  };

  return (
    <div className="space-y-2">
      {teamMembers?.map((member) =>
      <div
        key={member?.id}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-smooth cursor-pointer">

          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
              src={member?.avatar}
              alt={member?.avatarAlt}
              className="w-full h-full object-cover" />

            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(member?.status)}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-caption font-medium text-foreground line-clamp-1">
              {member?.name}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {member?.role}
            </p>
          </div>
          <button className="p-1 hover:bg-muted rounded transition-smooth flex-shrink-0">
            <Icon name="MessageSquare" size={16} />
          </button>
        </div>
      )}
      <button className="w-full py-2 text-sm font-caption font-medium text-primary hover:bg-primary/10 rounded-md transition-smooth">
        View Full Directory
      </button>
    </div>);

};

export default TeamDirectory;