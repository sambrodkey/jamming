import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spotify from '../utils/spotify';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        if (code) {
            Spotify.getAccessToken(code).then((token) => {
                if (token) {
                    localStorage.setItem('spotifyAccessToken', token);
                    navigate('/');
                }
            });
        }
    }, []);

    return <div>Logging in to Spotify...</div>;
};

export default Callback;
