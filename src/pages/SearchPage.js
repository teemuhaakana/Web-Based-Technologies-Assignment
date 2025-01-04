//hakusivu, käyttää searchbar. ja showslist-komponenttia hakutoiminnon toteuttamiseen ja
//sarjojen näyttämiseen
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ShowsList from '../components/ShowsList';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
      if (!response.ok) {
        throw new Error('Sarjojen haku epäonnistui');
      }
      const data = await response.json();
      setSearchResults(data.map(result => result.show));
    } catch (error) {
      setError('Sarjoja haettaessa tapahtui virhe');
    } finally {
      setLoading(false);
      setSearchPerformed(true);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className='alert'>Ladataan hakutuloksia...</p>}
      {error && <p className="error">{error}</p>}
      {searchPerformed && searchResults.length === 0 && !loading && !error && (
        <p className='alert'>Sarjoja ei löytynyt annetulla hakusanalla</p>
      )}
      <br></br>
      {searchResults.length > 0 && <ShowsList shows={searchResults} />}
    </div>
  );
}

export default SearchPage;
