//listaa API:sta parametrinä haetut sarjat
import React from 'react';
import { Link } from "react-router-dom";
import noimage from '../utils/noimage.jpg';

function ShowsList({ shows }) {
  if (shows.length === 0) {
    return <p>Sarjoja ei löytynyt annetulla hakusanalla</p>;
  }
  return (
    <div className="show-list">
      {shows.map(show => (
        <div key={show.id} className="show-card">
          <h2>{show.name}</h2>
          <Link to={`/shows/${show.id}`}>
          {show.image && show.image.medium ? (
            <img src={show.image.medium} alt={show.name} />
            ) : (
            <img src={noimage} alt={show.name}></img>
         )}
        </Link>
          <p>{show.genres.join(', ')}</p>
          <p>Arvosana: {show.rating.average}</p>
          <p>Kieli: {show.language}</p>
        </div>
      ))}
    </div>
  );
}

export default ShowsList;
