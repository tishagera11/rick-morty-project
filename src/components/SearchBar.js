import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name'); 

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(filterType, searchTerm);
    }
  };

  return (
    <div className="search-bar-container">
      <select
        className="filter-select"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="species">Species</option>
        <option value="gender">Gender</option>
      </select>
      <input
        type="text"
        className="search-input"
        placeholder="Search and press Enter..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default SearchBar;