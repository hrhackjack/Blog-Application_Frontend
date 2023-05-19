import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <form className="search-form ms-5">
        <i className="fa fa-search search-icon"></i>
    <input
    className='query'
      type="text"
      placeholder="Search..."
      size="71"
      value={query}
      onChange={handleInputChange}
    />
  </form>
  );
};

export default SearchBar;
