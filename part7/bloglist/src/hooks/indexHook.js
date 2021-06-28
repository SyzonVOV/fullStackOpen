import { useState } from 'react'
import PropTypes from 'prop-types';

export const useField = (name, type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event?.target.value||'')
  }

  return {
    name,
    value,
    type,
    onChange
  }
}

useField.propTypes = {
  name: PropTypes.string.isRequired,
};