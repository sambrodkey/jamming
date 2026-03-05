# Jammming

A Spotify playlist builder built with React. Search for songs, build a playlist, and save it straight to your Spotify account.

This was a project from Codecademy's frontend development curriculum. The core requirements were to use React components, manage state, and work with the Spotify API — but I ended up going further than the spec and adding a bunch of extra features along the way.

---

## What it does

- Search the Spotify library in real time as you type
- Browse results with album art
- Add songs to a custom playlist and remove them if you change your mind
- Rename the playlist before saving
- Save the finished playlist directly to your Spotify account

---

## Tech

- React (Vite)
- Spotify Web API (Authorization Code Flow)
- A small Express backend to handle the OAuth token exchange, since the client secret can't be exposed in the browser

---

## Running it locally

You'll need a Spotify developer account and an app registered at [developer.spotify.com](https://developer.spotify.com). Set the redirect URI to `http://127.0.0.1:5173/callback`.

Create a `.env` file in the root with:

```
VITE_SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

Then run the backend and frontend in two separate terminals:

```bash
# Terminal 1 - backend
node server.js

# Terminal 2 - frontend
npm run dev
```

Open `http://127.0.0.1:5173`, log in with Spotify, and you're good to go.

---

## Notes

Spotify removed preview URLs from most tracks via the API a while back, so audio previews don't work for the majority of songs. The play button uses their iframe embed instead, though it only works properly in production (HTTPS) — locally it won't play due to browser security restrictions.

Token expiry is handled automatically. If your session expires, the login button reappears and your playlist is preserved in session storage so you don't lose your work.
