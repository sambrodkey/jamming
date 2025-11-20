const Track = ({ track, onAdd, onRemove }) => {
    const handleAdd = () => {
        onAdd(track);
    };

    const handleRemove = () => {
        onRemove(track);
    };

    return (
        <div>
            <p>
                {track.name} by {track.artist} - {track.album}
            </p>
            {onAdd && <button onClick={handleAdd}>+</button>}
            {onRemove && <button onClick={handleRemove}>-</button>}
        </div>
    );
};

export default Track;
