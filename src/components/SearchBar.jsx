import { useState, useEffect, useRef } from 'react';
import Spotify from '../utils/spotify';

const SearchBar = ({ onSearchResults }) => {
    const [term, setTerm] = useState('');
    const debounceTimer = useRef(null);

    // Restore pending search term after login redirect
    useEffect(() => {
        const pending = sessionStorage.getItem('pendingSearch');
        if (pending) {
            setTerm(pending);
            sessionStorage.removeItem('pendingSearch');
        }
    }, []);

    // Debounced live search
    useEffect(() => {
        if (!term.trim()) {
            onSearchResults([]);
            return;
        }

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(async () => {
            const results = await Spotify.search(term);
            onSearchResults(results);
        }, 300);

        return () => clearTimeout(debounceTimer.current);
    }, [term]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!term) return;
        const results = await Spotify.search(term);
        onSearchResults(results);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Enter A Song, Album, or Artist"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">SEARCH</button>
        </form>
    );
};

export default SearchBar;
