import Tracklist from './Tracklist';

const Playlist = ({ playlistName, onNameChange, tracks }) => {
    const handleChange = (event) => {
        onNameChange(event.target.value);
    };

    return (
        <div>
            <h2>Playlist</h2>
            <div>
                <label>Playlist Name:</label>
                <input
                    value={playlistName}
                    onChange={handleChange}
                />
            </div>
            <Tracklist tracks={tracks} />
            <button>Save to Spotify</button>
        </div>
    );
};

export default Playlist;
