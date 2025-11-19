import Track from './Track';

const Tracklist = () => {
    const mockTracks = [
        { trackName: 'Song 1', artist: 'Artist A', album: 'Album A' },
        { trackName: 'Song 2', artist: 'Artist B', album: 'Album B' },
        { trackName: 'Song 3', artist: 'Artist C', album: 'Album C' },
    ];

    return (
        <div>
            {mockTracks.map((track, index) => (
                <Track
                    key={index}
                    {...track}
                />
            ))}
        </div>
    );
};

export default Tracklist;
