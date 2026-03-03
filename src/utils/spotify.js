let accessToken = localStorage.getItem('spotifyAccessToken') || null;

// Check if a token is already in localStorage
// const savedToken = localStorage.getItem('spotifyAccessToken');
// if (savedToken) accessToken = savedToken;

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

console.log('Client ID:', clientId);

const redirectUri = 'http://127.0.0.1:5173/callback';
const scopes = 'playlist-modify-public playlist-modify-private';

const Spotify = {
    // Step 1: Redirect user to Spotify login
    authorize() {
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
        navigator.clipboard.writeText(authUrl);
        console.log('Auth URL copied to clipboard');
        window.location = authUrl;
    },

    // Step 2: Exchange code for access token
    getAccessToken(code) {
        if (accessToken) return Promise.resolve(accessToken);

        if (!code) {
            console.error('No code provided to getAccessToken');
            return Promise.resolve(null);
        }

        return fetch(`http://127.0.0.1:8888/get-token?code=${code}`)
            .then((res) => res.json())
            .then((data) => {
                accessToken = data.access_token;

                // Save token
                localStorage.setItem('spotifyAccessToken', accessToken);

                return accessToken;
            })
            .catch((err) => {
                console.error('Error fetching access token:', err);
                return null;
            });
    },

    // Search tracks on Spotify
    search(term) {
        if (!accessToken) {
            console.error('No access token. User must log in first.');
            return Promise.resolve([]);
        }

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data.tracks) return [];
                return data.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    image: track.album.images[2]?.url || track.album.images[0]?.url,
                }));
            })
            .catch((err) => {
                console.error('Error searching tracks:', err);
                return [];
            });
    },

    savePlaylist(playlistName, trackUris) {
        if (!accessToken) {
            console.error('No access token. User must log in first.');
            return Promise.reject('No access token');
        }

        return fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then((res) => res.json())
            .then((data) => {
                const userId = data.id;

                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: playlistName, public: false }),
                })
                    .then((res) => res.json())
                    .then((playlist) => {
                        const playlistId = playlist.id;
                        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ uris: trackUris }),
                        });
                    });
            })
            .catch((err) => console.error('Error saving playlist:', err));
    },
};

export default Spotify;
