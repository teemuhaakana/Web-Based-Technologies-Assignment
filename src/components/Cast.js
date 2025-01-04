//komponentti hakee sarjan näyttelijät sarjan id:n perusteella API:sta
import React, { useState, useEffect } from 'react';

function Cast({ showid }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCast = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${showid}/cast`);
      if (!response.ok) {
        throw new Error('Näyttelijöiden haku epäonnistui');
      }
      const data = await response.json();
      setCast(data);
    } catch (error) {
      setError('Näyttelijöiden hakemisessa tapahtui virhe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showid]);

  if (loading) {
    return <p className='alert'>Ladataan näyttelijöitä...</p>;
  }

  if (error) {
    return <p className='error'>Virhe: {error}</p>;
  }

  return (
    <div className='cast'>
      <h2>Näyttelijät</h2>
      {cast.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Näyttelijä</th>
              <th>Näyttelijän esittämä hahmo</th>
            </tr>
          </thead>
          <tbody>
            {cast.map(member => (
              <tr key={member.person.id}>
                <td>
                  {member.person.image && member.person.image.medium && (
                    <img src={member.person.image.medium} alt={member.person.name} />
                  )}
                  <p>{member.person.name}</p>
                </td>
                <td>
                  {member.character.image && member.character.image.medium && (
                    <img src={member.character.image.medium} alt={member.character.name} />
                  )}
                  <p>{member.character.name}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='alert'>Sarjan näyttelijöitä ei löydy</p>
      )}
    </div>
  );
  
}

export default Cast;
