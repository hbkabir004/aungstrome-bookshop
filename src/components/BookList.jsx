import { memo } from 'react';
import BookCard from './BookCard';

const BookList = memo(({ books, wishlist, onToggleWishlist }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          isWishlisted={wishlist.some(b => b.id === book.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
});

BookList.displayName = 'BookList';

export default BookList;