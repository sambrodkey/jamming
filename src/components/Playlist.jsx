import { useState } from 'react';
import Tracklist from './Tracklist';

const Playlist = ({ playlistName, onNameChange, tracks, onRemove, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (event) => {
        onNameChange(event.target.value);
    };

    return (
        <div>
            {isEditing ? (
                <input
                    value={playlistName}
                    onChange={handleChange}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                />
            ) : (
                <h2 onClick={() => setIsEditing(true)}>{playlistName}</h2>
            )}

            <Tracklist
                tracks={tracks}
                onRemove={onRemove}
            />
            <button onClick={onSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;
