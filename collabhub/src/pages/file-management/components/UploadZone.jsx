import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const UploadZone = ({ onUpload, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newProgress = files?.map((file, index) => ({
      id: Date.now() + index,
      name: file?.name,
      size: file?.size,
      progress: 0,
      status: 'uploading'
    }));

    setUploadProgress(newProgress);

    // Simulate upload progress
    newProgress?.forEach((item, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadProgress(prev => 
            prev?.map(p => p?.id === item?.id ? { ...p, progress: 100, status: 'completed' } : p)
          );
        } else {
          setUploadProgress(prev => 
            prev?.map(p => p?.id === item?.id ? { ...p, progress: Math.floor(progress) } : p)
          );
        }
      }, 500);
    });

    setTimeout(() => {
      onUpload(files);
    }, 3000);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / (1024 * 1024))?.toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1400 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-warm-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">Upload Files</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close upload"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="p-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-all
              ${isDragging 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }
            `}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Upload" size={32} className="text-primary" />
              </div>
              <div>
                <p className="text-base font-caption font-medium text-foreground mb-1">
                  Drag and drop files here
                </p>
                <p className="text-sm text-muted-foreground">or</p>
              </div>
              <button
                onClick={() => fileInputRef?.current?.click()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth font-caption font-medium"
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                Maximum file size: 100 MB
              </p>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadProgress?.length > 0 && (
            <div className="mt-6 space-y-3 max-h-64 overflow-y-auto">
              {uploadProgress?.map((item) => (
                <div key={item?.id} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Icon name="File" size={20} className="text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-caption font-medium text-foreground line-clamp-1">
                          {item?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(item?.size)}
                        </p>
                      </div>
                    </div>
                    {item?.status === 'completed' ? (
                      <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
                    ) : (
                      <span className="text-sm font-caption font-medium text-primary flex-shrink-0">
                        {item?.progress}%
                      </span>
                    )}
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${item?.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadZone;