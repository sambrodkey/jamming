import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Callback from './components/Callback';
import { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Spotify from './utils/spotify';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('spotifyAccessToken') && Date.now() < parseInt(localStorage.getItem('spotifyTokenExpiry')));
    const [searchResults, setSearchResults] = useState([]);

    const [playlistName, setPlaylistName] = useState(sessionStorage.getItem('playlistName') || 'My Playlist: click to rename');

    const [playlistTracks, setPlaylistTracks] = useState(JSON.parse(sessionStorage.getItem('playlistTracks') || '[]'));

    useEffect(() => {
        sessionStorage.setItem('playlistName', playlistName);
    }, [playlistName]);

    useEffect(() => {
        sessionStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
    }, [playlistTracks]);

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

    const [isSaving, setIsSaving] = useState(false);

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map((track) => track.uri);
        setIsSaving(true);
        Spotify.savePlaylist(playlistName, trackURIs)
            .then(() => {
                setPlaylistName('My Playlist: click to rename');
                setPlaylistTracks([]);
                sessionStorage.removeItem('playlistName');
                sessionStorage.removeItem('playlistTracks');
                setIsSaving(false);
            })
            .catch((err) => {
                console.error(err);
                setIsSaving(false);
            });
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="App">
                            {isSaving && (
                                <div className="saving-overlay">
                                    <div className="saving-box">
                                        <div className="saving-spinner" />
                                        <p>Saving to Spotify...</p>
                                    </div>
                                </div>
                            )}
                            <div className="top-bar">
                                {isLoggedIn ? (
                                    <button
                                        className="user-btn"
                                        onClick={() => {
                                            localStorage.clear();
                                            setIsLoggedIn(false);
                                        }}
                                    >
                                        👤 Log Out
                                    </button>
                                ) : (
                                    <button
                                        className="user-btn"
                                        onClick={() => Spotify.authorize()}
                                    >
                                        Login to Spotify
                                    </button>
                                )}
                            </div>
                            <h1>
                                Ja<span>mm</span>ing
                            </h1>
                            <SearchBar onSearchResults={setSearchResults} />
                            <div className="main-content">
                                <SearchResults
                                    tracks={searchResults}
                                    onAdd={addTrack}
                                    playlistTracks={playlistTracks}
                                />
                                <Playlist
                                    tracks={playlistTracks}
                                    onNameChange={setPlaylistName}
                                    playlistName={playlistName}
                                    onRemove={removeTrack}
                                    onSave={savePlaylist}
                                />
                            </div>
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
