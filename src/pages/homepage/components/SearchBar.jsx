import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ accessToken }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate();
  let debounceTimeout;

  const fetchResults = useCallback(async (query) => {
    if (query.length > 2) {
      try {
        const response = await fetch(`https://localhost:7298/api/Product/search?text=${query}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setIsModalOpen(true);
        } else {
          console.error('Error fetching search results');
        }
      } catch (error) {
        console.error('Search fetch error:', error);
      }
    } else {
      setSearchResults([]);
      setIsModalOpen(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchImages = async () => {
      const urls = {};
      for (const result of searchResults) {
        if (result.imageId) {
          try {
            const response = await fetch(`https://localhost:7298/api/File/${result.imageId}`, {
              headers: { 'Authorization': `Bearer ${accessToken}` },
            });
            const data = await response.json();
            urls[result.id] = data.url;
          } catch (error) {
            console.error('Image fetch error:', error);
          }
        }
      }
      setImageUrls(urls);
    };

    if (searchResults.length > 0) {
      fetchImages();
    }
  }, [searchResults, accessToken]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => fetchResults(value), 300);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchResults.length > 0) {
      setIsModalOpen(false);
      navigate(`/product/${searchResults[0].id}`, { state: { product: searchResults[0] } });
    }
  };

  const handleSelect = (product) => {
    setIsModalOpen(false);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto mt-[70px] relative ">
      <div className="text-base text-white">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="mt-2 shadow-md border-b-2 focus:outline-none rounded-2xl py-3 px-6 block w-full text-white placeholder-white"
        />

        {isModalOpen && (
          <div className="absolute top-full left-0 w-full bg-white bg-opacity-95 mt-2 rounded-2xl shadow-lg max-h-64 overflow-y-auto">
            {/* X button */}
            <div className="flex justify-end px-4 py-2">
              <button
                className="text-red-400 text-xl hover:text-red-500 focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            {/* Results */}
            {searchResults.length > 0 ? (
              searchResults.map(result => (
                <div
                  key={result.id}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800 cursor-pointer transition"
                  onClick={() => handleSelect(result)}
                >
                  {imageUrls[result.id] && (
                    <img
                      src={imageUrls[result.id]}
                      alt={result.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  )}
                  <span className="text-black">{result.name}</span>
                </div>
              ))
            ) : (
              <div className="px-4 pb-4 text-black">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
