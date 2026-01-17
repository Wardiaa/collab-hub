import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentDocuments = () => {
  const documents = [
  {
    id: 1,
    name: "Q1 Marketing Strategy.pdf",
    type: "pdf",
    size: "2.4 MB",
    modifiedBy: "Sarah Chen",
    modifiedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
    modifiedByAvatarAlt: "Professional headshot of Asian woman with long black hair wearing white blouse",
    modifiedAt: "2 hours ago"
  },
  {
    id: 2,
    name: "Design System v2.0.fig",
    type: "figma",
    size: "15.8 MB",
    modifiedBy: "Alex Morgan",
    modifiedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1aef10a9f-1763294632369.png",
    modifiedByAvatarAlt: "Professional headshot of Caucasian man with short brown hair in navy suit",
    modifiedAt: "5 hours ago"
  },
  {
    id: 3,
    name: "Budget Report 2026.xlsx",
    type: "excel",
    size: "1.2 MB",
    modifiedBy: "Jordan Lee",
    modifiedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1837cc2b9-1763297271592.png",
    modifiedByAvatarAlt: "Professional headshot of African American woman with curly hair wearing blue blazer",
    modifiedAt: "Yesterday"
  }];


  const getFileIcon = (type) => {
    const icons = {
      pdf: 'FileText',
      figma: 'Figma',
      excel: 'FileSpreadsheet',
      doc: 'FileText'
    };
    return icons?.[type] || 'File';
  };

  const getFileColor = (type) => {
    const colors = {
      pdf: 'text-error',
      figma: 'text-primary',
      excel: 'text-success',
      doc: 'text-accent'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-2">
      {documents?.map((doc) =>
      <div
        key={doc?.id}
        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-smooth cursor-pointer">

          <div className="flex-shrink-0">
            <Icon name={getFileIcon(doc?.type)} size={24} color={`var(--color-${getFileColor(doc?.type)?.replace('text-', '')})`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-caption font-medium text-foreground line-clamp-1">
              {doc?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {doc?.size} • Modified {doc?.modifiedAt}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
              src={doc?.modifiedByAvatar}
              alt={doc?.modifiedByAvatarAlt}
              className="w-full h-full object-cover" />

            </div>
            <button className="p-1 hover:bg-muted rounded transition-smooth">
              <Icon name="MoreVertical" size={16} />
            </button>
          </div>
        </div>
      )}
      <button className="w-full py-2 text-sm font-caption font-medium text-primary hover:bg-primary/10 rounded-md transition-smooth">
        View All Files
      </button>
    </div>);

};

export default RecentDocuments;