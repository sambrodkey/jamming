import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from './components/Callback';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from './utils/spotify';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('spotifyAccessToken'));

    const [searchResults, setSearchResults] = useState([]);

    const [playlistName, setPlaylistName] = useState('My Playlist: click to rename');

    const [playlistTracks, setPlaylistTracks] = useState([]);

    const addTrack = (track) => {
        setPlaylistTracks((prev) => {
            if (prev.find((savedTrack) => savedTrack.id === track.id)) return prev;
            return [...prev, track];
        });
    };

    const removeTrack = (track) => {
        const updatedTracks = playlistTracks.filter((savedTrack) => savedTrack.id !== track.id);
        setPlaylistTracks(updatedTracks);
    };

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(playlistName, trackURIs)
            .then(() => {
                console.log('Playlist saved to Spotify!');
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
                            <h1>
                                Ja<span>mm</span>ing
                            </h1>
                            <SearchBar
                                onSearchResults={setSearchResults}
                                onAddTrack={addTrack}
                            />
                            <div className="main-content">
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
                            </div>
                            {!isLoggedIn && <button onClick={() => Spotify.authorize()}>Login to Spotify</button>}
                        </div>
                    }
                />
                <Route
                    path="/callback"
                    element={<Callback setIsLoggedIn={setIsLoggedIn} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
