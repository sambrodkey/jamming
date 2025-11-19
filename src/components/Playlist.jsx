import Tracklist from './Tracklist';

const Playlist = ({ tracks }) => {
    return (
        <div>
            <h2> My Playlist</h2>
            <Tracklist tracks={tracks} />
            <button>Save to Spotify</button>
        </div>
    );
};

export default Playlist;
