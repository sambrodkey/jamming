import { useEffect } from 'react';
import Spotify from '../utils/spotify';

const Callback = () => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if (code) {
            Spotify.getAccessToken(code).then((token) => {
                console.log('Access Token:', token);
                // Optional: store token in localStorage if you want persistence
                localStorage.setItem('spotifyAccessToken', token);
            });
        }
    }, []);

    return <div>Logging in to Spotify...</div>;
};

export default Callback;
