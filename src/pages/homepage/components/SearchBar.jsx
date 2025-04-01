
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = ({ accessToken }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value.length > 2) {
      try {
        const response = await fetch(`https://localhost:7298/api/Product/search?text=${event.target.value}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error('Error fetching search results');
        }
      } catch (error) {
        console.error('Search fetch error:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        className="text-white px-4 py-2 bg-transparent border-b-2 border-white focus:outline-none"
      />
      {searchQuery && (
        <div className="absolute top-full left-0 w-full bg-black text-white mt-2 max-h-60 overflow-auto">
          {searchResults.length > 0 ? (
            searchResults.map(result => (
              <div key={result.id} className="p-2 hover:bg-gray-700">
                <Link to={`/product/${result.id}`} className="block">
                  {result.name}
                </Link>
              </div>
            ))
          ) : (
            <div className="p-2">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
