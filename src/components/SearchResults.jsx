import Tracklist from './Tracklist';

const SearchResults = ({ tracks }) => {
    return (
        <div>
            <h2>Results</h2>
            <Tracklist tracks={tracks} />
        </div>
    );
};

export default SearchResults;
