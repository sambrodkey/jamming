import React from 'react';

const SearchBar = () => {
    return (
        <div className="SearchBar">
            <input
                type="text"
                placeholder="Enter A Song, Album, or Artist"
            />
            <button>SEARCH</button>
        </div>
    );
};

export default SearchBar;
