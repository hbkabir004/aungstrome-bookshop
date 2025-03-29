import { useCallback, useEffect, useMemo, useState } from 'react';
import BookList from '../components/BookList';
import GenreFilter from '../components/GenreFilter';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import useLocalStorage from '../hooks/useLocalStorage';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
    const [preferences, setPreferences] = useLocalStorage('preferences', {
        searchTerm: '',
        selectedGenre: '',
        currentPage: 1
    });

    useEffect(() => {
        setSearchTerm(preferences.searchTerm);
        setSelectedGenre(preferences.selectedGenre);
        setCurrentPage(preferences.currentPage);
    }, [preferences.currentPage, preferences.searchTerm, preferences.selectedGenre]);

    useEffect(() => {
        setPreferences({
            searchTerm,
            selectedGenre,
            currentPage
        });
    }, [searchTerm, selectedGenre, currentPage, setPreferences]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://gutendex.com/books?page=${currentPage}`);
                const data = await response.json();
                setBooks(data.results);
                const total = Math.ceil(data.count / data.results.length);
                setTotalPages(total);
            } catch (err) {
                setError('Failed to fetch books');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [currentPage]);

    const toggleWishlist = useCallback((book) => {
        setWishlist(prev => {
            const isBookWishlisted = prev.some(b => b.id === book.id);
            if (isBookWishlisted) {
                return prev.filter(b => b.id !== book.id);
            }
            return [...prev, book];
        });
    }, [setWishlist]);

    const genres = useMemo(() =>
        [...new Set(books.flatMap(book => book.subjects))],
        [books]
    );

    const filteredBooks = useMemo(() =>
        books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = !selectedGenre || book.subjects.some(subject =>
                subject.toLowerCase().includes(selectedGenre.toLowerCase())
            );
            return matchesSearch && matchesGenre;
        }),
        [books, searchTerm, selectedGenre]
    );

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <GenreFilter value={selectedGenre} onChange={setSelectedGenre} genres={genres} />
            </div>

            {filteredBooks.length === 0 ? (
                <div className="text-center text-gray-500">No books found</div>
            ) : (
                <BookList
                    books={filteredBooks}
                    wishlist={wishlist}
                    onToggleWishlist={toggleWishlist}
                />
            )}

            {!searchTerm && !selectedGenre && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}

export default Home;