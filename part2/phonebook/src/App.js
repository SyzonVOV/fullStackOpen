import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Search from './components/Search'
import NewPerson from './components/NewPerson'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  };
  
  useEffect(hook, []);

  const addName = (event) => {
    let uniqueName = persons.some(person => person.name === newName);
    if (uniqueName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      event.preventDefault()  
      const nameObject = {
        name: newName.trim(),
        id: persons.length + 1,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
      setNewName('');
      setNewNumber('');  
    }
   }
    
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
    }

    const personsToShow = newFilter === ""
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <NewPerson addName={addName} 
                  newName={newName} newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App;
