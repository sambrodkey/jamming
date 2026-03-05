import { useState } from 'react';

const Track = ({ track, onAdd, onRemove }) => {
    const [showPreview, setShowPreview] = useState(false);

    const handleAdd = () => onAdd(track);
    const handleRemove = () => onRemove(track);

    return (
        <div className="track">
            {track.image && (
                <img
                    src={track.image}
                    alt={track.album}
                    className="track-image"
                />
            )}
            <div className="track-info">
                <p className="track-name">{track.name}</p>
                <p className="track-sub">
                    {track.artist} · {track.album}
                </p>
                {showPreview && (
                    <iframe
                        src={`https://open.spotify.com/embed/track/${track.id}`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                )}
            </div>
            <button
                className="play-btn"
                onClick={() => setShowPreview(!showPreview)}
            >
                {showPreview ? '⏹' : '▶'}
            </button>
            {onAdd && <button onClick={handleAdd}>+</button>}
            {onRemove && <button onClick={handleRemove}>-</button>}
        </div>
    );
};

export default Track;
