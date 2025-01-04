//searchbar
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setError('Syötä hakusana');
      return;
    }
    if (query.trim().length < 3) {
      setError('Hakusanan tulee olla vähintään 3 merkkiä pitkä');
      return;
    }
    onSearch(query);
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Hae TV-sarjoja"
          value={query}
          onChange={handleChange}
        />
        <button className="search-button" type="submit">Hae</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SearchBar;
