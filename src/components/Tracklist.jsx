import Track from './Track';

const Tracklist = ({ tracks }) => {
    return (
        <div>
            {tracks.map((track) => (
                <Track
                    key={track.id}
                    {...track}
                />
            ))}
        </div>
    );
};

export default Tracklist;
