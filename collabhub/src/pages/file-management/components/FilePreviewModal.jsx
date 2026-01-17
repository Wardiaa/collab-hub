import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FilePreviewModal = ({ file, onClose, onDownload, onShare }) => {
  const renderPreview = () => {
    if (file?.type === 'image') {
      return (
        <div className="w-full h-full flex items-center justify-center bg-background/50">
          <Image
            src={file?.thumbnail}
            alt={file?.thumbnailAlt}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    }

    if (file?.type === 'document' || file?.type === 'pdf') {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <div className="text-center">
            <Icon name="FileText" size={64} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-base font-caption font-medium text-foreground mb-2">
              Document Preview
            </p>
            <p className="text-sm text-muted-foreground">
              Preview not available for this file type
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center">
          <Icon name="File" size={64} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-base font-caption font-medium text-foreground mb-2">
            Preview Not Available
          </p>
          <p className="text-sm text-muted-foreground">
            Download the file to view its contents
          </p>
        </div>
      </div>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / (1024 * 1024))?.toFixed(1) + ' MB';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-1500 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Icon name="File" size={24} className="text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="text-base md:text-lg font-heading font-semibold text-foreground line-clamp-1">
              {file?.name}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              {formatFileSize(file?.size)} • Modified {formatDate(file?.modifiedAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            iconName="Download"
            onClick={() => onDownload(file)}
            className="hidden sm:flex"
          >
            Download
          </Button>
          <Button
            variant="outline"
            iconName="Share2"
            onClick={() => onShare(file)}
            className="hidden sm:flex"
          >
            Share
          </Button>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close preview"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>
      {/* Preview Area */}
      <div className="flex-1 overflow-hidden">
        {renderPreview()}
      </div>
      {/* Mobile Actions */}
      <div className="sm:hidden flex items-center gap-2 p-4 border-t border-border bg-card">
        <Button
          variant="outline"
          iconName="Download"
          onClick={() => onDownload(file)}
          fullWidth
        >
          Download
        </Button>
        <Button
          variant="outline"
          iconName="Share2"
          onClick={() => onShare(file)}
          fullWidth
        >
          Share
        </Button>
      </div>
      {/* File Info Sidebar */}
      <div className="hidden lg:block absolute right-0 top-[73px] bottom-0 w-80 bg-card border-l border-border overflow-y-auto">
        <div className="p-6">
          <h3 className="text-sm font-caption font-semibold text-foreground mb-4">
            File Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                Type
              </p>
              <p className="text-sm text-foreground capitalize">{file?.type}</p>
            </div>

            <div>
              <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                Size
              </p>
              <p className="text-sm text-foreground">{formatFileSize(file?.size)}</p>
            </div>

            <div>
              <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                Modified
              </p>
              <p className="text-sm text-foreground">{formatDate(file?.modifiedAt)}</p>
            </div>

            <div>
              <p className="text-xs font-caption font-medium text-muted-foreground mb-2">
                Modified By
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10">
                  <Image
                    src={file?.modifiedBy?.avatar}
                    alt={file?.modifiedBy?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-caption font-medium text-foreground">
                    {file?.modifiedBy?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{file?.modifiedBy?.email}</p>
                </div>
              </div>
            </div>

            {file?.isShared && (
              <div>
                <p className="text-xs font-caption font-medium text-muted-foreground mb-2">
                  Sharing
                </p>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Icon name="Share2" size={16} className="text-primary" />
                  <span>Shared with {file?.sharedWith || 2} people</span>
                </div>
              </div>
            )}

            {file?.activeEditors && file?.activeEditors?.length > 0 && (
              <div>
                <p className="text-xs font-caption font-medium text-muted-foreground mb-2">
                  Active Editors
                </p>
                <div className="flex items-center gap-2 text-sm text-success">
                  <Icon name="Users" size={16} />
                  <span>{file?.activeEditors?.length} people editing</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;