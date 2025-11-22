import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from './components/Callback';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from './utils/spotify';

function App() {
    const [searchResults, setSearchResults] = useState([
        { id: 1, name: 'Song 1', artist: 'Artist A', album: 'Album A' },
        { id: 2, name: 'Song 2', artist: 'Artist B', album: 'Album B' },
        { id: 3, name: 'Song 3', artist: 'Artist C', album: 'Album C' },
    ]);

    const [playlistName, setPlaylistName] = useState('My Playlist: click to rename');

    const [playlistTracks, setPlaylistTracks] = useState([
        { id: 101, name: 'Playlist Song 1', artist: 'Artist X', album: 'Album A' },
        { id: 102, name: 'Playlist Song 2', artist: 'Artist Y', album: 'Album B' },
    ]);

    const addTrack = (track) => {
        // Check if the track is already in the playlist
        if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
            return; // Already in playlist, do nothing
        }
        // Add the new track
        setPlaylistTracks([...playlistTracks, track]);
    };

    const removeTrack = (track) => {
        const updatedTracks = playlistTracks.filter((savedTrack) => savedTrack.id !== track.id);
        setPlaylistTracks(updatedTracks);
    };

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map((track) => track.uri); // make sure each track has a `uri`

        Spotify.savePlaylist(playlistName, trackURIs)
            .then(() => {
                console.log('Playlist saved to Spotify!');
                // Reset playlist state
                setPlaylistName('New Playlist');
                setPlaylistTracks([]);
            })
            .catch((err) => console.error(err));
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="App">
                            <h1>Jammming</h1>
                            <SearchBar />
                            <SearchResults
                                tracks={searchResults}
                                onAdd={addTrack}
                            />
                            <Playlist
                                tracks={playlistTracks}
                                onNameChange={setPlaylistName}
                                playlistName={playlistName}
                                onRemove={removeTrack}
                                onSave={savePlaylist}
                            />
                            <button onClick={() => Spotify.authorize()}>Login to Spotify</button>
                        </div>
                    }
                />
                <Route
                    path="/callback"
                    element={<Callback />}
                />
            </Routes>
        </Router>
    );
}

export default App;
