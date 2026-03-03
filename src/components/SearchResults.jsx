import Tracklist from './Tracklist';

const SearchResults = ({ tracks, onAdd }) => {
    return (
        <div className="search-results">
            <h2>Results</h2>
            {tracks.length === 0 ? (
                <p className="empty-message">Search for a song to get started</p>
            ) : (
                <Tracklist
                    tracks={tracks}
                    onAdd={onAdd}
                />
            )}
        </div>
    );
};

export default SearchResults;
