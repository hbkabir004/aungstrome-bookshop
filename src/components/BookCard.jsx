import React, { memo } from 'react';

const BookCard = memo(({ book }) => {
  return (
    <div className="card">
      <div className="relative">
        {book.formats['image/jpeg'] && (
          <img
            src={book.formats['image/jpeg']}
            alt={book.title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-muted-foreground">
          {book.authors.map(author => author.name).join(', ')}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {book.subjects.slice(0, 3).map(subject => (
            <span
              key={subject}
              className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

BookCard.displayName = 'BookCard';

export default BookCard;