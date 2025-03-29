import React, { memo } from 'react';

const SearchBar = memo(({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search books..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 p-2 border border-blue-300 rounded bg-background text-foreground border-input"
    />
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;