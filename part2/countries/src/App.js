import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Search from './components/Search'
import Countries from './components/Countries'
import Country from './components/Country'


function App() {
  const [ countries, setCountries ] = useState([]);
  const [ newCountryInput, setNewCountryInput ] = useState('');

  const hookCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  };
  
  useEffect(hookCountries, []);

  const handleCountryInputChange = (event) => {
    //debugger
    setNewCountryInput(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name
    .toLowerCase().includes(newCountryInput.toLowerCase()))

  return (
    <>
      <Search value={newCountryInput} handleCountryInputChange={handleCountryInputChange}/>
      {countriesToShow.length === 1
        ? <Country country={countriesToShow[0]}/>
        : <div><Countries value={countriesToShow} handle={handleCountryInputChange}/></div>}
    </>
  );
}

export default App;
