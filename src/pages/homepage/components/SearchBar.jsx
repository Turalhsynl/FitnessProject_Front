// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SearchBar = ({ accessToken }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const navigate = useNavigate();
//   let debounceTimeout;

//   const fetchResults = useCallback(async (query) => {
//     if (query.length > 2) {
//       try {
//         const response = await fetch(`https://localhost:7298/api/Product/search?text=${query}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setSearchResults(data);
//         } else {
//           console.error('Error fetching search results');
//         }
//       } catch (error) {
//         console.error('Search fetch error:', error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   }, [accessToken]);

//   const handleSearch = (event) => {
//     const value = event.target.value;
//     setSearchQuery(value);

//     clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => fetchResults(value), 300);
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && searchResults.length > 0) {
//       navigate(`/product/${searchResults[0].id}`, { state: { product: searchResults[0] } });
//     }
//   };

//   const handleSelect = (product) => {
//     navigate(`/product/${product.id}`, { state: { product } });
//   };

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchQuery}
//         onChange={handleSearch}
//         onKeyDown={handleKeyDown}
//         className="text-white px-4 py-2 bg-transparent border-b-2 border-white focus:outline-none"
//       />
//       {searchQuery && (
//         <div className="absolute top-full left-0 w-full bg-black text-white mt-2 max-h-60 overflow-auto">
//           {searchResults.length > 0 ? (
//             searchResults.map(result => (
//               <div 
//                 key={result.id} 
//                 className="p-2 hover:bg-gray-700 cursor-pointer"
//                 onClick={() => handleSelect(result)}
//               >
//                 {result.name}
//               </div>
//             ))
//           ) : (
//             <div className="p-2">No results found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;













import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ accessToken }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
        } else {
          console.error('Error fetching search results');
        }
      } catch (error) {
        console.error('Search fetch error:', error);
      }
    } else {
      setSearchResults([]);
    }
  }, [accessToken]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => fetchResults(value), 300);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchResults.length > 0) {
      navigate(`/product/${searchResults[0].id}`, { state: { product: searchResults[0] } });
    }
  };

  const handleSelect = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto mt-[70px]">
      <div className="relative z-30 text-base text-white">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="mt-2 shadow-md border-b-2 focus:outline-none rounded-2xl py-3 px-6 block w-full  text-white placeholder-white"
        />
        {searchQuery && (
          <div className="">
            {searchResults.length > 0 ? (
              searchResults.map(result => (
                <div
                  key={result.id}
                  className="block w-max p-2 hover:border-b-2 cursor-pointer text-white"
                  onClick={() => handleSelect(result)}
                >
                  {result.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-black">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
