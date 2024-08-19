import React, { useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const cityInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityInput = cityInputRef.current.value.trim();
    if (!cityInput) return;
    onSearch(cityInput);
    cityInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        ref={cityInputRef}
        type="text" 
        placeholder="Enter city" 
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
