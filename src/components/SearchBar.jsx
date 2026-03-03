import { useState, useEffect, useRef } from 'react';
import Spotify from '../utils/spotify';

const SearchBar = ({ onSearchResults, onAddTrack }) => {
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceTimer = useRef(null);
    const containerRef = useRef(null);

    // Debounced search for dropdown
    useEffect(() => {
        if (!term.trim()) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(async () => {
            const results = await Spotify.search(term);
            setSuggestions(results.slice(0, 3));
            setShowDropdown(true);
        }, 300);

        return () => clearTimeout(debounceTimer.current);
    }, [term]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!term) return;
        const results = await Spotify.search(term);
        onSearchResults(results);
        setShowDropdown(false);
    };

    const handleSuggestionClick = (track) => {
        onAddTrack(track);
        setShowDropdown(false);
        setTerm('');
    };

    return (
        <div
            className="searchbar-container"
            ref={containerRef}
        >
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter A Song, Album, or Artist"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                />
                <button type="submit">SEARCH</button>
            </form>
            {showDropdown && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((track) => (
                        <div
                            key={track.id}
                            className="suggestion-item"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSuggestionClick(track)}
                        >
                            {track.image && (
                                <img
                                    src={track.image}
                                    alt={track.album}
                                    className="suggestion-image"
                                />
                            )}
                            <div className="suggestion-info">
                                <span className="suggestion-name">{track.name}</span>
                                <span className="suggestion-artist">{track.artist}</span>
                            </div>
                            <span className="suggestion-add">+</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
