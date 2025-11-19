import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

function App() {
    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar />
            <SearchResults />
            <Playlist />
        </div>
    );
}

export default App;
