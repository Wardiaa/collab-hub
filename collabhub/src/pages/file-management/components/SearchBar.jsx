import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fileType, setFileType] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const fileTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'document', label: 'Documents' },
    { value: 'spreadsheet', label: 'Spreadsheets' },
    { value: 'presentation', label: 'Presentations' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'pdf', label: 'PDFs' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = () => {
    onFilterChange({ fileType, dateRange });
  };

  return (
    <div className="space-y-3">
      {/* Main Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search files by name, content, or tags..."
            value={searchQuery}
            onChange={(e) => handleSearch(e?.target?.value)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </div>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-smooth"
        >
          <Icon name="SlidersHorizontal" size={18} />
          <span className="text-sm font-caption font-medium">Filters</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-smooth ${showAdvanced ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="flex flex-col sm:flex-row gap-3 p-4 bg-muted rounded-lg">
          <div className="flex-1">
            <Select
              label="File Type"
              options={fileTypeOptions}
              value={fileType}
              onChange={(value) => {
                setFileType(value);
                handleFilterChange();
              }}
            />
          </div>
          <div className="flex-1">
            <Select
              label="Date Modified"
              options={dateRangeOptions}
              value={dateRange}
              onChange={(value) => {
                setDateRange(value);
                handleFilterChange();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;