import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = name => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(
          `https://restcountries.eu/rest/v2/name/${name}`,
          {
            params: {
              fullText: true,
            },
          },
        );
        console.log(`🚀 ~ file: App.js ~ line 37 ~ useEffect ~ data`, request.data[0]);
        setCountry(request.data[0]);
      } catch (error) {
        const { response } = error;
        const { request, ...errorObject } = response;
        console.log(errorObject);
        setCountry({found: true});
      }
    }
    if (name) {
      fetchData();
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flag}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = e => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
