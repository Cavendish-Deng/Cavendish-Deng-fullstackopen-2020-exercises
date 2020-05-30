import React, { useState, useEffect } from 'react';
import bookService from './services/phonebook'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [originalPersons, setOriginalPersons] = useState([])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  let timer;

  useEffect(() => {
    bookService
      .getAll()
      .then((initialBook) => {
        setOriginalPersons(initialBook)
        setPersons(initialBook)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (newName === '' || newNumber === '') {
      alert('name and number is required')
    } else {
      let existedPerson = persons.filter(person => person.name === newName)
      if (existedPerson.length !== 0) {
        let isConfirmToReplace = window.confirm(`${existedPerson[0].name} is already added to phonebook, replace the old number with new one?`)
        if (isConfirmToReplace) {
          bookService
            .update(existedPerson[0].id, personObject)
            .then(updateObj => {
              setMessage(`updated ${updateObj.name}'number`);
              setTimeout(() => {
                setMessage(null)
              }, 3000);
              setPersons(persons.map(p => p.id !== updateObj.id ? p : updateObj))
              setNewName("")
              setNewNumber("")
              setOriginalPersons(originalPersons.map(p => p.id !== updateObj.id ? p : updateObj))
            }).catch((error) => {
              setMessage("some errors heppened...")
              console.log('error', error)
            })
        }
      } else {
        bookService
          .create(personObject)
          .then(returnedObj => {
            setPersons(persons.concat(returnedObj))
            setNewName("")
            setNewNumber("")
            setOriginalPersons(originalPersons.concat(returnedObj))
            setMessage(`Added ${returnedObj.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000);
          })
      }
    }
  }

  const deletePerson = (id, name) => {
    const isConfirmToDelete = window.confirm(`delete ${name}?`)
    if (isConfirmToDelete) {
      bookService
        .remove(id)
        .then(res => {
          setMessage(`Deleted ${name}`)
          if(timer) clearTimeout();
          timer = setTimeout(() => {
            setMessage(null)
          }, 3000);
          setPersons(persons.filter(person => person.id !== id))
          setOriginalPersons(persons.filter(person => person.id !== id))
        }).catch((error) => {
          console.log('error', error);
          setMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 3000);
          setPersons(persons.filter(person => person.id !== id))
          setOriginalPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowChange = (event) => {
    let showPerson = originalPersons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setPersons(showPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleShowChange={handleShowChange} />
      <h2>Add a new</h2>
      <Notification message={message} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {persons
        .map(p =>
          <Person
            key={p.id}
            person={p}
            deletePerson={() => deletePerson(p.id, p.name)}
          />)}
    </div>
  )
}

export default App
