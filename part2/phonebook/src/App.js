import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import NewPerson from './components/NewPerson';
import Notification from './components/Notification';
import Person from './components/Person';
import apiService from './services/notes';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);

  const hook = () => {
    apiService.getAll().then((persons) => {
      setPersons(persons);
    });
    // 13.10.2020
    /*     axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
 */
  };

  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();
    const updatePersonExist = persons.find((person) => person.name === newName);
    if (updatePersonExist) {
      if (
        window.confirm(
          `${updatePersonExist.name} is already added to phonebook, replace the old number with new one?`,
        )
      ) {
        const nameObject = {
          ...updatePersonExist,
          number: newNumber,
        };
        apiService
          .update(nameObject.id, nameObject)
          .then((response) => {
            if (response.status === 204) {
              createMessage({
                event: 'error',
                message: `Information of ${updatePersonExist.name} has been removed from server`,
              });
              setNewName('');
              setNewNumber('');
              setPersons(
                persons.filter((person) => {
                  return !(person.id === updatePersonExist.id);
                }),
              );
            } else {
              setPersons(
                persons.map((person) =>
                  person.id !== updatePersonExist.id ? person : response.data,
                ),
              );
              setNewName('');
              setNewNumber('');
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              createMessage({
                event: 'error',
                message: `${error.response.data.error}`,
              });
            }
          });
      }
    } else {
      const nameObject = {
        name: newName.trim(),
        number: newNumber,
      };
      apiService
        .create(nameObject)
        .then((person) => {
          setPersons(persons.concat(person));
          createMessage({
            event: 'added',
            message: `Added ${person.name}`,
          });
        })
        .catch((error) => {
          createMessage({
            event: 'error',
            message: `${error.response.data.error}`,
          });
        });
      setNewName('');
      setNewNumber('');
    }
  };

  const createMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5500);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDeletePerson = (idPerson, namePerson) => {
    if (window.confirm(`Do you really want to delete ${namePerson}?`)) {
      apiService
        .deleteIt(idPerson)
        .then((response) => {
          setPersons(
            persons.filter((person) => {
              return !(person.id === idPerson);
            }),
          );
          createMessage({
            event: 'deleted',
            message: `The person's '${namePerson}' was deleted from server`,
          });
        })
        .catch((error) => {
          createMessage({
            event: 'error',
            message: `The person's '${namePerson}' has already been deleted from server`,
          });
          setPersons(
            persons.filter((person) => {
              return !(person.id === idPerson);
            }),
          );
        });
    }
  };

  const personsToShow =
    newFilter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Search value={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <NewPerson
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {personsToShow.map((person, ind) => (
            <Person
              key={person.id}
              ind={ind + 1}
              name={person.name}
              id={person.id}
              del={() => {
                handleDeletePerson(person.id, person.name);
              }}
              number={person.number}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
