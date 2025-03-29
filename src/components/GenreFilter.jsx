import React, { memo } from 'react';

const GenreFilter = memo(({ value, onChange, genres }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded bg-background text-foreground border-input max-w-full"
    >
      <option value="">All Genres</option>
      {genres.map(genre => (
        <option key={genre} value={genre}>{genre}</option>
      ))}
    </select>
  );
});

GenreFilter.displayName = 'GenreFilter';

export default GenreFilter;