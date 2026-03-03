const Track = ({ track, onAdd, onRemove }) => {
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
            </div>
            {onAdd && <button onClick={handleAdd}>+</button>}
            {onRemove && <button onClick={handleRemove}>-</button>}
        </div>
    );
};

export default Track;
