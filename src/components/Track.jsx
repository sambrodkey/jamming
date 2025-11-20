const Track = ({ name, artist, album }) => {
    return (
        <div>
            <p>
                {name} by {artist} - {album}
            </p>
            <button>Add</button>
            <button>Remove</button>
        </div>
    );
};

export default Track;
