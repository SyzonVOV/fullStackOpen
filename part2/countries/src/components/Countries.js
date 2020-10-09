import React from "react";
import ShowButton from './ShowButton'

function Countries({ value, handle }) {
  console.log(value);
  let show = "";
  switch (true) {
    case value.length > 10 && value.length < 250:
      show = "Too many matches, specify another filter";
      break;
    case value.length <= 10:
      show = value.map((val) => <Country country={val.name} 
                                          handle={handle}/>);
      break;
    default:
      show = `Enter a country`;
  }
  return (
    <>
      <div>{show}</div>
    </>
  );
}

const Country = ({ country, handle }) => {
  return (
<div>{country}  
<ShowButton country={country} handle={handle}/></div> 
 );
};

export default Countries;
