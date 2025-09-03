import React from 'react';
import CharacterCard from './CharacterCard';

function CharacterList({ characters }) {
  if (!characters || characters.length === 0) {
    return <p className="message">No characters found for this search. 😥</p>;
  }

  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}

export default CharacterList;