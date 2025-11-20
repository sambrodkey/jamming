import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

function App() {
    const [searchResults, setSearchResults] = useState([
        { id: 1, name: 'Song 1', artist: 'Artist A', album: 'Album A' },
        { id: 2, name: 'Song 2', artist: 'Artist B', album: 'Album B' },
        { id: 3, name: 'Song 3', artist: 'Artist C', album: 'Album C' },
    ]);

    const [playlistTracks, setPlaylistTracks] = useState([
        { id: 101, name: 'Playlist Song 1', artist: 'Artist X', album: 'Album A' },
        { id: 102, name: 'Playlist Song 2', artist: 'Artist Y', album: 'Album B' },
    ]);

    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar />
            <SearchResults tracks={searchResults} />
            <Playlist tracks={playlistTracks} />
        </div>
    );
}

export default App;
