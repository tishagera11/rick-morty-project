import React, { useState, useEffect } from 'react';
import './App.css';
import CharacterList from './components/CharacterList';
import SearchBar from './components/SearchBar';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacters = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}?${query}`);
      if (!response.ok) {
        if (response.status === 404) {
          setCharacters([]);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        setCharacters(data.results || []);
      }
    } catch (e) {
      setError('Failed to fetch characters. Please try again later.');
      console.error(e);
      setCharacters([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearch = (filterType, searchTerm) => {
    if (searchTerm.trim() === '') {
      fetchCharacters();
    } else {
      const query = new URLSearchParams({ [filterType]: searchTerm }).toString();
      fetchCharacters(query);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Rick and Morty Character Directory 🚀</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        {loading && <p className="message">Loading characters...</p>}
        {error && <p className="message error">{error}</p>}
        {!loading && !error && (
          <CharacterList characters={characters} />
        )}
      </main>
    </div>
  );
}

export default App;