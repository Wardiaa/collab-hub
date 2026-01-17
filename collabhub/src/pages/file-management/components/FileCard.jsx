import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FileCard = ({ file, onSelect, isSelected, onPreview, onShare, onDownload, onDelete }) => {
  const getFileIcon = (type) => {
    const iconMap = {
      'document': 'FileText',
      'spreadsheet': 'Sheet',
      'presentation': 'Presentation',
      'image': 'Image',
      'video': 'Video',
      'audio': 'Music',
      'pdf': 'FileText',
      'folder': 'Folder'
    };
    return iconMap?.[type] || 'File';
  };

  const getFileColor = (type) => {
    const colorMap = {
      'document': 'text-blue-600',
      'spreadsheet': 'text-green-600',
      'presentation': 'text-orange-600',
      'image': 'text-purple-600',
      'video': 'text-red-600',
      'audio': 'text-pink-600',
      'pdf': 'text-red-700',
      'folder': 'text-amber-600'
    };
    return colorMap?.[type] || 'text-gray-600';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / (1024 * 1024))?.toFixed(1) + ' MB';
  };

  const formatDate = (date) => {
    const now = new Date();
    const fileDate = new Date(date);
    const diffMs = now - fileDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return fileDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className={`
        group relative bg-card rounded-lg border-2 transition-all
        ${isSelected ? 'border-primary shadow-warm-md' : 'border-border hover:border-primary/50 hover:shadow-warm'}
      `}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-2 left-2 z-10">
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onSelect(file?.id);
          }}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center transition-all
            ${isSelected 
              ? 'bg-primary border-primary' :'bg-card border-border group-hover:border-primary/50'
            }
          `}
          aria-label={`Select ${file?.name}`}
        >
          {isSelected && <Icon name="Check" size={14} color="white" />}
        </button>
      </div>
      {/* File Preview/Thumbnail */}
      <div 
        className="relative h-40 bg-muted rounded-t-lg overflow-hidden cursor-pointer"
        onClick={() => onPreview(file)}
      >
        {file?.thumbnail ? (
          <Image
            src={file?.thumbnail}
            alt={file?.thumbnailAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon 
              name={getFileIcon(file?.type)} 
              size={48} 
              className={getFileColor(file?.type)}
            />
          </div>
        )}

        {/* Collaboration Indicator */}
        {file?.activeEditors && file?.activeEditors?.length > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-success/90 text-success-foreground px-2 py-1 rounded-full">
            <Icon name="Users" size={12} />
            <span className="text-xs font-caption font-medium">{file?.activeEditors?.length}</span>
          </div>
        )}

        {/* Shared Indicator */}
        {file?.isShared && (
          <div className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground p-1.5 rounded-full">
            <Icon name="Share2" size={14} />
          </div>
        )}
      </div>
      {/* File Info */}
      <div className="p-3">
        <h3 className="text-sm font-caption font-semibold text-foreground line-clamp-1 mb-1">
          {file?.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{formatFileSize(file?.size)}</span>
          <span>{formatDate(file?.modifiedAt)}</span>
        </div>

        {/* Modified By */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
            <Image
              src={file?.modifiedBy?.avatar}
              alt={file?.modifiedBy?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {file?.modifiedBy?.name}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPreview(file)}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-muted hover:bg-muted/80 transition-smooth"
            aria-label="Preview file"
          >
            <Icon name="Eye" size={14} />
            <span className="text-xs font-caption font-medium">Preview</span>
          </button>
          <button
            onClick={() => onShare(file)}
            className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-smooth"
            aria-label="Share file"
          >
            <Icon name="Share2" size={14} />
          </button>
          <button
            onClick={() => onDownload(file)}
            className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-smooth"
            aria-label="Download file"
          >
            <Icon name="Download" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;