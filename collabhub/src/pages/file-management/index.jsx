import React, { useState } from 'react';
import Header from '../../components/navigation/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FileCard from './components/FileCard';
import FileListItem from './components/FileListItem';
import FolderBreadcrumb from './components/FolderBreadcrumb';
import UploadZone from './components/UploadZone';
import ShareModal from './components/ShareModal';
import FilePreviewModal from './components/FilePreviewModal';
import SearchBar from './components/SearchBar';

const FileManagement = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [shareModalFile, setShareModalFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [sortBy, setSortBy] = useState('modified');
  const [currentPath, setCurrentPath] = useState([]);

  const mockFiles = [
  {
    id: 1,
    name: 'Q1 Marketing Strategy.pdf',
    type: 'pdf',
    size: 2457600,
    modifiedAt: new Date(Date.now() - 3600000),
    modifiedBy: {
      name: 'Sarah Chen',
      email: 'sarah.chen@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
      avatarAlt: 'Professional headshot of Asian woman with long black hair in white blouse'
    },
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b15b3533-1766747593529.png",
    thumbnailAlt: 'Business document with charts and graphs on white paper with pen',
    isShared: true,
    sharedWith: 3,
    activeEditors: []
  },
  {
    id: 2,
    name: 'Team Photo 2026.jpg',
    type: 'image',
    size: 4567890,
    modifiedAt: new Date(Date.now() - 7200000),
    modifiedBy: {
      name: 'Michael Rodriguez',
      email: 'michael.r@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143b978a3-1763294952544.png",
      avatarAlt: 'Professional headshot of Hispanic man with short black hair in navy suit'
    },
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0744f9a-1765646427860.png",
    thumbnailAlt: 'Diverse team of professionals smiling together in modern office with natural lighting',
    isShared: false,
    activeEditors: []
  },
  {
    id: 3,
    name: 'Product Roadmap 2026.xlsx',
    type: 'spreadsheet',
    size: 1234567,
    modifiedAt: new Date(Date.now() - 10800000),
    modifiedBy: {
      name: 'Emily Watson',
      email: 'emily.w@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_117e4bd25-1763295402445.png",
      avatarAlt: 'Professional headshot of Caucasian woman with blonde hair in gray blazer'
    },
    thumbnail: "https://images.unsplash.com/photo-1571677246347-5040036b95cc",
    thumbnailAlt: 'Spreadsheet with colorful data charts and financial graphs on computer screen',
    isShared: true,
    sharedWith: 5,
    activeEditors: ['user1', 'user2']
  },
  {
    id: 4,
    name: 'Design System Guidelines.pdf',
    type: 'pdf',
    size: 3456789,
    modifiedAt: new Date(Date.now() - 86400000),
    modifiedBy: {
      name: 'Alex Morgan',
      email: 'alex.morgan@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_182183743-1763294553218.png",
      avatarAlt: 'Professional headshot of African American man with short hair in dark suit'
    },
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1654ebf47-1764773611909.png",
    thumbnailAlt: 'Design mockups and color swatches arranged on white desk with laptop',
    isShared: true,
    sharedWith: 8,
    activeEditors: []
  },
  {
    id: 5,
    name: 'Client Presentation.pptx',
    type: 'presentation',
    size: 5678901,
    modifiedAt: new Date(Date.now() - 172800000),
    modifiedBy: {
      name: 'David Kim',
      email: 'david.kim@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116a772f1-1763295955745.png",
      avatarAlt: 'Professional headshot of Asian man with glasses in light blue shirt'
    },
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_17aca2303-1766815657843.png",
    thumbnailAlt: 'Business presentation slides displayed on large screen in conference room',
    isShared: false,
    activeEditors: []
  },
  {
    id: 6,
    name: 'Brand Assets.zip',
    type: 'document',
    size: 12345678,
    modifiedAt: new Date(Date.now() - 259200000),
    modifiedBy: {
      name: 'Lisa Anderson',
      email: 'lisa.a@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2d3f8ee-1763296078446.png",
      avatarAlt: 'Professional headshot of Caucasian woman with red hair in black top'
    },
    thumbnail: null,
    isShared: true,
    sharedWith: 12,
    activeEditors: []
  },
  {
    id: 7,
    name: 'Tutorial Video.mp4',
    type: 'video',
    size: 45678901,
    modifiedAt: new Date(Date.now() - 345600000),
    modifiedBy: {
      name: 'James Wilson',
      email: 'james.w@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f4887fb3-1763292534814.png",
      avatarAlt: 'Professional headshot of Caucasian man with brown hair in white shirt'
    },
    thumbnail: "https://images.unsplash.com/photo-1698235301688-6b5b79dac3d5",
    thumbnailAlt: 'Video recording setup with camera and lighting equipment in studio',
    isShared: false,
    activeEditors: []
  },
  {
    id: 8,
    name: 'Meeting Notes Jan 2026.docx',
    type: 'document',
    size: 234567,
    modifiedAt: new Date(Date.now() - 432000000),
    modifiedBy: {
      name: 'Rachel Green',
      email: 'rachel.g@collabhub.com',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17784c577-1763297418164.png",
      avatarAlt: 'Professional headshot of Caucasian woman with brown hair in navy blazer'
    },
    thumbnail: null,
    isShared: true,
    sharedWith: 4,
    activeEditors: ['user3']
  }];


  const quickAccessFolders = [
  { id: 'recent', name: 'Recent', icon: 'Clock', count: 15 },
  { id: 'starred', name: 'Starred', icon: 'Star', count: 8 },
  { id: 'shared', name: 'Shared with me', icon: 'Users', count: 23 },
  { id: 'trash', name: 'Trash', icon: 'Trash2', count: 5 }];


  const storageInfo = {
    used: 45.2,
    total: 100,
    percentage: 45.2
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles((prev) =>
    prev?.includes(fileId) ?
    prev?.filter((id) => id !== fileId) :
    [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles?.length === mockFiles?.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(mockFiles?.map((f) => f?.id));
    }
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
  };

  const handleShare = (file) => {
    setShareModalFile(file);
  };

  const handleDownload = (file) => {
    console.log('Downloading:', file?.name);
  };

  const handleDelete = (file) => {
    console.log('Deleting:', file?.name);
  };

  const handleUpload = (files) => {
    console.log('Uploading files:', files);
    setShowUploadZone(false);
  };

  const handleSearch = (query) => {
    console.log('Searching:', query);
  };

  const handleFilterChange = (filters) => {
    console.log('Filters:', filters);
  };

  const handleNavigate = (folderId) => {
    console.log('Navigating to:', folderId);
  };

  const handleShareComplete = (sharedWith) => {
    console.log('Shared with:', sharedWith);
    setShareModalFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-card border-r border-border overflow-y-auto">
          <div className="p-4">
            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
              fullWidth
              onClick={() => setShowUploadZone(true)}>

              Upload Files
            </Button>
          </div>

          {/* Quick Access */}
          <div className="px-4 pb-4">
            <h3 className="text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Quick Access
            </h3>
            <div className="space-y-1">
              {quickAccessFolders?.map((folder) =>
              <button
                key={folder?.id}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted transition-smooth text-left">

                  <div className="flex items-center gap-3">
                    <Icon name={folder?.icon} size={18} className="text-muted-foreground" />
                    <span className="text-sm font-caption font-medium text-foreground">
                      {folder?.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{folder?.count}</span>
                </button>
              )}
            </div>
          </div>

          {/* Storage Info */}
          <div className="px-4 pb-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-caption font-medium text-foreground">Storage</span>
                <span className="text-xs text-muted-foreground">
                  {storageInfo?.used} GB of {storageInfo?.total} GB
                </span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${storageInfo?.percentage}%` }} />

              </div>
              <Button variant="outline" size="sm" fullWidth>
                Upgrade Storage
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Header Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                  My Files
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Manage and organize your team documents
                </p>
              </div>
              <Button
                variant="default"
                iconName="Upload"
                iconPosition="left"
                onClick={() => setShowUploadZone(true)}
                className="lg:hidden">

                Upload Files
              </Button>
            </div>

            {/* Breadcrumb */}
            <div className="mb-6">
              <FolderBreadcrumb path={currentPath} onNavigate={handleNavigate} />
            </div>

            {/* Search and Filters */}
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSelectAll}
                  className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedFiles?.length === mockFiles?.length ?
                  'bg-primary border-primary' :
                  selectedFiles?.length > 0 ?
                  'bg-primary/50 border-primary' : 'bg-card border-border hover:border-primary/50'}
                  `
                  }
                  aria-label="Select all files">

                  {selectedFiles?.length === mockFiles?.length ?
                  <Icon name="Check" size={14} color="white" /> :
                  selectedFiles?.length > 0 ?
                  <Icon name="Minus" size={14} color="white" /> :
                  null}
                </button>
                {selectedFiles?.length > 0 &&
                <span className="text-sm font-caption font-medium text-foreground">
                    {selectedFiles?.length} selected
                  </span>
                }
              </div>

              <div className="flex items-center gap-2">
                {selectedFiles?.length > 0 &&
                <>
                    <Button variant="outline" size="sm" iconName="Download">
                      Download
                    </Button>
                    <Button variant="outline" size="sm" iconName="Share2">
                      Share
                    </Button>
                    <Button variant="outline" size="sm" iconName="Trash2">
                      Delete
                    </Button>
                  </>
                }
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-2 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">

                  <option value="modified">Modified Date</option>
                  <option value="name">Name</option>
                  <option value="size">Size</option>
                  <option value="type">Type</option>
                </select>
                <div className="flex items-center gap-1 bg-muted rounded-md p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-smooth ${
                    viewMode === 'grid' ? 'bg-card shadow-warm-sm' : 'hover:bg-card/50'}`
                    }
                    aria-label="Grid view">

                    <Icon name="Grid3x3" size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-smooth ${
                    viewMode === 'list' ? 'bg-card shadow-warm-sm' : 'hover:bg-card/50'}`
                    }
                    aria-label="List view">

                    <Icon name="List" size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Files Display */}
            {viewMode === 'grid' ?
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {mockFiles?.map((file) =>
              <FileCard
                key={file?.id}
                file={file}
                isSelected={selectedFiles?.includes(file?.id)}
                onSelect={handleSelectFile}
                onPreview={handlePreview}
                onShare={handleShare}
                onDownload={handleDownload}
                onDelete={handleDelete} />

              )}
              </div> :

            <div className="bg-card rounded-lg border border-border overflow-hidden">
                {mockFiles?.map((file) =>
              <FileListItem
                key={file?.id}
                file={file}
                isSelected={selectedFiles?.includes(file?.id)}
                onSelect={handleSelectFile}
                onPreview={handlePreview}
                onShare={handleShare}
                onDownload={handleDownload}
                onDelete={handleDelete} />

              )}
              </div>
            }
          </div>
        </main>
      </div>
      {/* Modals */}
      {showUploadZone &&
      <UploadZone
        onUpload={handleUpload}
        onClose={() => setShowUploadZone(false)} />

      }
      {shareModalFile &&
      <ShareModal
        file={shareModalFile}
        onClose={() => setShareModalFile(null)}
        onShare={handleShareComplete} />

      }
      {previewFile &&
      <FilePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
        onDownload={handleDownload}
        onShare={handleShare} />

      }
    </div>);

};

export default FileManagement;