/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BookList from '../components/BookList';
import GenreFilter from '../components/GenreFilter';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import useDebounce from '../hooks/useDebounce';
import useLocalStorage from '../hooks/useLocalStorage';

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
    const [preferences, setPreferences] = useLocalStorage('preferences', {
        searchTerm: '',
        selectedGenre: '',
        currentPage: 1
    });

    const debouncedSearchTerm = useDebounce(preferences.searchTerm, 300);
    const cache = useMemo(() => new Map(), []);
    const initialLoad = useRef(true);

    useEffect(() => {
        const isSearchOperation =
            preferences.searchTerm !== '' ||
            preferences.selectedGenre !== '';

        const fetchBooks = async () => {
            const cacheKey = `${preferences.currentPage}-${debouncedSearchTerm}-${preferences.selectedGenre}`;

            // Show loading only for non-search operations without cached data
            if (!isSearchOperation && !cache.has(cacheKey)) {
                setLoading(true);
            }

            try {
                if (cache.has(cacheKey)) {
                    setBooks(cache.get(cacheKey));
                } else {
                    const response = await fetch(
                        `https://gutendex.com/books?page=${preferences.currentPage}&search=${debouncedSearchTerm}`
                    );
                    const data = await response.json();
                    setBooks(data.results);
                    cache.set(cacheKey, data.results);
                    setTotalPages(Math.ceil(data.count / data.results.length));
                }
                setError(null);
            } catch (err) {
                setError('Failed to fetch books');
            } finally {
                if (!isSearchOperation || initialLoad.current) {
                    setLoading(false);
                    initialLoad.current = false;
                }
            }
        };

        fetchBooks();
    }, [preferences.currentPage, debouncedSearchTerm, preferences.selectedGenre, cache]);

    // Handler functions remain the same
    const toggleWishlist = useCallback((book) => {
        setWishlist(prev => prev.some(b => b.id === book.id)
            ? prev.filter(b => b.id !== book.id)
            : [...prev, book]
        );
    }, [setWishlist]);

    const genres = useMemo(() =>
        [...new Set(books.flatMap(book => book.subjects))],
        [books]
    );

    const filteredBooks = useMemo(() =>
        books.filter(book =>
            !preferences.selectedGenre ||
            book.subjects.some(subject =>
                subject.toLowerCase().includes(preferences.selectedGenre.toLowerCase())
            )
        ),
        [books, preferences.selectedGenre]
    );

    const handleSearch = useCallback((value) => {
        setPreferences(prev => ({ ...prev, searchTerm: value }));
    }, [setPreferences]);

    const handleGenre = useCallback((value) => {
        setPreferences(prev => ({ ...prev, selectedGenre: value, currentPage: 1 }));
    }, [setPreferences]);

    const handlePageChange = useCallback((page) => {
        setPreferences(prev => ({ ...prev, currentPage: page }));
    }, [setPreferences]);

    // if (loading) return <div className="fixed top-4 right-4 bg-white p-2 rounded shadow-lg">Loading...</div>;
    if (error) return <div className="text-3xl font-semibold text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            {loading && (
                <Loading />
            )}

            {!loading && !error &&
                <div className="flex flex-col md:flex-row gap-4">
                    <SearchBar value={preferences.searchTerm} onChange={handleSearch} />
                    <GenreFilter
                        value={preferences.selectedGenre}
                        onChange={handleGenre}
                        genres={genres}
                    />
                </div>
            }

            {(!loading && !error && filteredBooks.length === 0) ? (
                <div className="text-center text-gray-500">No books found</div>
            ) : (
                <BookList
                    books={filteredBooks}
                    wishlist={wishlist}
                    onToggleWishlist={toggleWishlist}
                />
            )}

            {!loading && !error && !debouncedSearchTerm && !preferences.selectedGenre && (
                <Pagination
                    currentPage={preferences.currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}

export default Home;