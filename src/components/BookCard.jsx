import React, { memo } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookCard = memo(({ book, isWishlisted, onToggleWishlist }) => {
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
        <button
          onClick={() => onToggleWishlist(book)}
          className="absolute top-2 right-2 p-2 bg-background rounded-full shadow-md"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-muted-foreground" />
          )}
        </button>
      </div>
      <div className="p-4">
        <Link to={`/book/${book.id}`} className="block">
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
        </Link>
      </div>
    </div>
  );
});

BookCard.displayName = 'BookCard';

export default BookCard;