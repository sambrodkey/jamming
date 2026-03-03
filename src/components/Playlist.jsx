import { useState } from 'react';
import Tracklist from './Tracklist';

const Playlist = ({ playlistName, onNameChange, tracks, onRemove, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [hasBeenRenamed, setHasBeenRenamed] = useState(false);

    const handleChange = (event) => {
        onNameChange(event.target.value);
    };

    const handleBlur = (event) => {
        if (event.target.value.trim() === '') {
            onNameChange('My Playlist: click to rename');
            setHasBeenRenamed(false);
        } else {
            setHasBeenRenamed(true);
        }
        setIsEditing(false);
    };

    const handleFocus = (event) => {
        if (playlistName === 'My Playlist: click to rename') {
            onNameChange('');
        }
    };

    return (
        <div className="playlist">
            {isEditing ? (
                <input
                    value={playlistName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    autoFocus
                />
            ) : (
                <h2
                    className={hasBeenRenamed ? '' : 'playlist-name-prompt'}
                    onClick={() => setIsEditing(true)}
                >
                    {playlistName}
                </h2>
            )}
            {tracks.length === 0 ? (
                <p className="empty-message">No songs yet — add some from your search!</p>
            ) : (
                <Tracklist
                    tracks={tracks}
                    onRemove={onRemove}
                />
            )}

            <button
                className="save-btn"
                onClick={onSave}
            >
                Save to Spotify
            </button>
        </div>
    );
};

export default Playlist;
