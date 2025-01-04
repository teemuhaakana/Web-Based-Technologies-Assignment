//hakee tv sarjan lisätiedot API:sta annetulla id:llä 
import React from 'react';
import { useState, useEffect } from 'react';
import { removeTags } from '../utils/removeTags';
import noimage from '../utils/noimage.jpg';

function ShowDetails({ showid }) {
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(showid)
  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setShow(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shows:', error.message);
        setError('Error fetching shows');
        setLoading(false);
      }
    };

    fetchShow();
  }, [showid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!show) {
    return <p>Show not found</p>;
  }

  return (
    <div className="show-details">
      <h2>Sarjan tiedot</h2>
      <div>
      {show.image && show.image.medium ? (
            <img src={show.image.medium} alt={show.name} />
            ) : (
            <img src={noimage} alt={show.name}></img>
         )}
        <h3>{show.name}</h3>
        <p>{removeTags(show.summary)}</p>
        <ul>
          <li>Arvosana: {show.rating.average}</li>
          <li>Genret: {show.genres.join(', ')}</li>
          <li>Kieli: {show.language}</li>
          <li>Status: {show.status}</li>
        </ul>
      </div>
    </div>
  );
};

export default ShowDetails;
