import React from "react";
import Weather from './Weather'

const Country = ({ country }) => {
 return (
    <div id={country.id}>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <div>
        <h3>languages</h3>
        <ul>
  {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
      </div>
      <img src={country.flag} alt="flag" />
      <Weather capital={country.capital}/>
    </div>
  );
};

export default Country;
