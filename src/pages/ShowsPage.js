//sarjojen selaamiseen tarkoitettu sivu, sarjoja suodatetaan genren mukaan
import React, { useState, useEffect } from 'react';
import '../App.css';
import ShowsList from '../components/ShowsList';

function ShowsPage() {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); 
  const [selectedGenres, setSelectedGenres] = useState([]); 
  const filters = ['Horror', 'Comedy', 'Crime', 'Drama', 'Action', 'Science-Fiction', 'Fantasy', 'Thriller', 'Mystery', 'Romance', 'Music', 'Anime','Supernatural', 'History'];

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
        if (!response.ok) {
          throw new Error('Sarjojen haku epäonnistui');
        }
        const data = await response.json();
        if (page === 0) {
          setShows(data);
        } else {
          setShows(prevShows => [...prevShows, ...data]);
        }
        setLoading(false);
      } catch (error) {
        setError('Sarjoja haettaessa tapahtui virhe');
        setLoading(false);
      }
    };

    fetchShows();
  }, [page]); 

  useEffect(() => {
    const filtered = shows.filter(show =>
      selectedGenres.every(genre => show.genres.includes(genre))
    );
    setFilteredShows(filtered);
  }, [selectedGenres, shows]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1); 
  };

  const handleGenreChange = genre => {
    setSelectedGenres(prevGenres =>
      prevGenres.includes(genre)
        ? prevGenres.filter(g => g !== genre)
        : [...prevGenres, genre]
    );
  };


  if (loading && shows.length === 0) {
    return <p className='alert'>Ladataan sarjoja...</p>;
  }

  return (
    <div className='showspage'>
      <h3>Genret:</h3>
        <div className="filters">
          {filters.map(genre => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          ))}
      </div>
      {error && <p className="error">{error}</p>}
      <ShowsList shows={filteredShows} />
      <div className='centerbutton'>
        <button className='button' onClick={loadMore}>Lataa lisää</button>
      </div>
    </div>
  );
};

export default ShowsPage;
