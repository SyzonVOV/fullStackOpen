import React from 'react';
import Button from './Button'

const NewPerson = ({addName, newName, newNumber, handleNameChange, handleNumberChange}) => {

  return (
  <>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <Button type="submit" text="add"/>
        </div>
      </form>
  </>

  )
  
}


export default NewPerson;
