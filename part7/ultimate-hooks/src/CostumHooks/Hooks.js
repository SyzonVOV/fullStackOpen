import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event?.target.value||'');
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(baseUrl);
        console.log(
          `🚀 ~ file: App.js ~ line 37 ~ useEffect ~ data`,
          response.data,
        );
        setResources(response.data);
      } catch (error) {
        const { response } = error;
        const { request, ...errorObject } = response;
        console.log(errorObject);
      }
    }
    fetchData();
  }, [baseUrl]);

  const create = async resource => {
    const response = await axios.post(baseUrl, resource)
    console.log(`🚀 ~ file: Hooks.js ~ line 41 ~ response`, response.data);
    setResources([...resources, response.data])
  };

  const service = {
    create,
  };

  return [resources, service];
};
