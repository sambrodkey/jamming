import Tracklist from './Tracklist';

const SearchResults = ({ tracks, onAdd, playlistTracks }) => {
    const filteredTracks = tracks.filter((track) => !playlistTracks.find((t) => t.id === track.id));

    return (
        <div className="search-results">
            <h2>Results</h2>
            {filteredTracks.length === 0 ? (
                <p className="empty-message">Search for a song to get started</p>
            ) : (
                <Tracklist
                    tracks={filteredTracks}
                    onAdd={onAdd}
                />
            )}
        </div>
    );
};

export default SearchResults;
