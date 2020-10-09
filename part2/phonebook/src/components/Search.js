import React from 'react';

const Search = ({value, handleFilterChange}) => {

  return (
  <>
      <form>
        <div>
          filter with: <input value={value} onChange={handleFilterChange}/>
        </div>
      </form>
  </>
  ) 
}

export default Search;
