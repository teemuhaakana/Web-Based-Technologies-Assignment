//komponentti hakee sarjan kaudet ja jaksot API:sta annetulla id:llä
import React, { useState, useEffect } from 'react';
import { removeTags } from '../utils/removeTags';


function Episodes({ showid, setSelectedSeason }) {
    const [seasons, setSeasons] = useState([]); 
    const [selectedSeason, setSelectedSeasonLocal] = useState(1); 
    const [episodes, setEpisodes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${showid}/seasons`);
                if (!response.ok) {
                    throw new Error('Sarjan kausien haku epäonnistui');
                }
                const data = await response.json();
                setSeasons(data);
            } catch (error) {
                setError('Sarjan kausien hakemisessa tapahtui virhe')
            }
        };

        fetchSeasons();
    }, [showid]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${showid}/episodes`);
                if (!response.ok) {
                    throw new Error('Sarjan jaksojen haku epäonnistui');
                }
                const data = await response.json();
                const seasonEpisodes = data.filter(episode => episode.season === selectedSeason);
                setEpisodes(seasonEpisodes);
            } catch (error) {
                setError('Sarjan jaksojen hakemisessa tapahtui virhe');
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [showid, selectedSeason]);

    const handleSeasonChange = (event) => {
        const newSelectedSeason = parseInt(event.target.value);
        setSelectedSeason(newSelectedSeason); 
        setSelectedSeasonLocal(newSelectedSeason); 
    };

    if (loading) {
        return <p className='alert'>Ladataan jaksoja...</p>;
    }

    if (error) {
        return <p className='error'>Virhe: {error}</p>;
    }
    return (
        <div className='episodes'>
          <h2>Jaksot - Kausi {selectedSeason}</h2>
          <div className='dropdown'>
          <select value={selectedSeason} onChange={handleSeasonChange}>
            {seasons.map(season => (
              <option key={season.number} value={season.number}>Kausi {season.number}</option>
            ))}
          </select>
          </div>
          <div className='episode-list'>
            {episodes.length > 0 ? (
              episodes.map(episode => (
                <div key={episode.id} className="episode-card">
                    <div>
                    <h3>Jakso {episode.number} - {episode.name}</h3>
                    <p>{removeTags(episode.summary)}</p>
                  </div>
                  {episode.image && episode.image.medium && (
                    <img src={episode.image.medium} alt={episode.name} />
                  )}
                </div>
              ))
            ) : (
              <p className='alert'>Ei jaksoja</p>
            )}
          </div>
        </div>
      );
}

export default Episodes;
