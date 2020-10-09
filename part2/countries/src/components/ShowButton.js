import React from 'react';

function ShowButton({country, handle}) {
  return (
    <>
    <button value={country} onClick={handle}>
    show
    </button>
</>
);
}

export default ShowButton;
