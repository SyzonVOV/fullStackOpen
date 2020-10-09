import React from 'react';

function Search({value, handleCountryInputChange}) {
  return (
    <>
    <form>
      <div>
        find countries: <input value={value} onChange={handleCountryInputChange}/>
      </div>
    </form>
</>
);
}

export default Search;
