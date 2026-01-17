import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FileListItem = ({ file, onSelect, isSelected, onPreview, onShare, onDownload, onDelete }) => {
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
    const fileDate = new Date(date);
    return fileDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className={`
        group flex items-center gap-3 px-4 py-3 bg-card border-b border-border transition-all
        ${isSelected ? 'bg-primary/5' : 'hover:bg-muted'}
      `}
    >
      {/* Selection Checkbox */}
      <button
        onClick={(e) => {
          e?.stopPropagation();
          onSelect(file?.id);
        }}
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0
          ${isSelected 
            ? 'bg-primary border-primary' :'bg-card border-border group-hover:border-primary/50'
          }
        `}
        aria-label={`Select ${file?.name}`}
      >
        {isSelected && <Icon name="Check" size={14} color="white" />}
      </button>
      {/* File Icon/Thumbnail */}
      <div className="w-10 h-10 flex-shrink-0">
        {file?.thumbnail ? (
          <div className="w-full h-full rounded overflow-hidden">
            <Image
              src={file?.thumbnail}
              alt={file?.thumbnailAlt}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded">
            <Icon 
              name={getFileIcon(file?.type)} 
              size={20} 
              className={getFileColor(file?.type)}
            />
          </div>
        )}
      </div>
      {/* File Name */}
      <div 
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => onPreview(file)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-caption font-medium text-foreground line-clamp-1">
            {file?.name}
          </h3>
          {file?.isShared && (
            <Icon name="Share2" size={14} className="text-primary flex-shrink-0" />
          )}
          {file?.activeEditors && file?.activeEditors?.length > 0 && (
            <div className="flex items-center gap-1 text-success flex-shrink-0">
              <Icon name="Users" size={14} />
              <span className="text-xs font-caption font-medium">{file?.activeEditors?.length}</span>
            </div>
          )}
        </div>
      </div>
      {/* Modified By */}
      <div className="hidden md:flex items-center gap-2 w-40 flex-shrink-0">
        <div className="w-6 h-6 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
          <Image
            src={file?.modifiedBy?.avatar}
            alt={file?.modifiedBy?.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm text-muted-foreground line-clamp-1">
          {file?.modifiedBy?.name}
        </span>
      </div>
      {/* File Size */}
      <div className="hidden lg:block w-24 text-sm text-muted-foreground flex-shrink-0">
        {formatFileSize(file?.size)}
      </div>
      {/* Modified Date */}
      <div className="hidden lg:block w-32 text-sm text-muted-foreground flex-shrink-0">
        {formatDate(file?.modifiedAt)}
      </div>
      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onShare(file)}
          className="p-2 rounded-md hover:bg-muted transition-smooth"
          aria-label="Share file"
        >
          <Icon name="Share2" size={16} />
        </button>
        <button
          onClick={() => onDownload(file)}
          className="p-2 rounded-md hover:bg-muted transition-smooth"
          aria-label="Download file"
        >
          <Icon name="Download" size={16} />
        </button>
        <button
          onClick={() => onDelete(file)}
          className="p-2 rounded-md hover:bg-destructive/10 text-destructive transition-smooth"
          aria-label="Delete file"
        >
          <Icon name="Trash2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default FileListItem;