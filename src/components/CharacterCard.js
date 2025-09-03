import React, { useState, useEffect } from 'react';

function CharacterCard({ character }) {
  const [firstEpisodeName, setFirstEpisodeName] = useState('Loading...');

  useEffect(() => {
    const fetchFirstEpisode = async () => {
      if (character.episode && character.episode.length > 0) {
        try {
          const response = await fetch(character.episode[0]);
          const data = await response.json();
          setFirstEpisodeName(data.name);
        } catch (error) {
          console.error("Failed to fetch episode:", error);
          setFirstEpisodeName('Unknown');
        }
      } else {
        setFirstEpisodeName('N/A');
      }
    };

    fetchFirstEpisode();
  }, [character.episode]); 

  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-details">
        <h3>{character.name}</h3>
        <p>
          <span className={`status-icon ${character.status.toLowerCase()}`}></span>
          {character.status} - {character.species}
        </p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Last known location:</strong></p>
        <p>{character.location.name}</p>
        <p><strong>First seen in:</strong></p>
        <p>{firstEpisodeName}</p>
      </div>
    </div>
  );
}

export default CharacterCard;