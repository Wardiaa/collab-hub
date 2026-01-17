import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className={`
        flex items-center gap-2 bg-muted rounded-md transition-all duration-300
        ${isExpanded ? 'w-full md:w-96' : 'w-full md:w-64'}
      `}>
        <Icon name="Search" size={18} className="ml-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search workspace..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
          className="flex-1 bg-transparent py-2 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mr-2 p-1 hover:bg-background rounded transition-smooth"
          >
            <Icon name="X" size={14} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;