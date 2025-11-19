const Track = ({ trackName, artist, album }) => {
    return (
        <div>
            <p>
                {trackName} by {artist} - {album}
            </p>
            <button>Add</button>
            <button>Remove</button>
        </div>
    );
};

export default Track;
