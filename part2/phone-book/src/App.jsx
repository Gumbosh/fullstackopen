import { useEffect, useState } from "react";
import DisplayNumbers from "./components/DisplayNumbers";
import AddNewNumber from "./components/AddNewNumber";
import Search from "./components/Search";
import numbersService from "./services/numbers";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorNotificationMessage, setErrorNotificationMessage] =
    useState(null);

  const handleNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleErrorNotification = (message) => {
    setErrorNotificationMessage(message);
    setTimeout(() => {
      setErrorNotificationMessage(null);
    }, 5000);
  };

  useEffect(() => {
    numbersService
      .getAll()
      .then((initialNumbers) => {
        setPersons(initialNumbers);
        setFilteredPersons(initialNumbers);
      })
      .catch((error) => {
        const errorMessage = "Error fetching numbers";
        console.error(errorMessage, error.message);
        handleErrorNotification(errorMessage);
      });
  }, []);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        const updatedPerson = { ...personToUpdate, number: newNumber };
        numbersService
          .update(personToUpdate.id, updatedPerson)
          .then(() => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            setFilteredPersons((prevFilteredPersons) =>
              prevFilteredPersons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            handleNotification(`Update ${personToUpdate.name} phone number`);
          })
          .catch((error) => {
            const errorMessage = `Information of ${personToUpdate.name} has already been removed from server`;
            console.error(errorMessage, error.message);
            handleErrorNotification(errorMessage);
            setPersons(
              persons.filter((person) => person.id !== personToUpdate.id)
            );
            setFilteredPersons(
              filteredPersons.filter(
                (person) => person.id !== personToUpdate.id
              )
            );
          });
        setNewName("");
        setNewNumber("");
      } else {
        alert(`${newName} is already added to phonebook`);
      }
    } else {
      numbersService
        .create({ name: newName, number: newNumber })
        .then((newPerson) => {
          setPersons((prevPersons) => [...prevPersons, newPerson]);
          setFilteredPersons((prevFilteredPersons) => [
            ...prevFilteredPersons,
            newPerson,
          ]);
          setNewName("");
          setNewNumber("");
          handleNotification(`Added ${newName}`);
        })
        .catch((error) => {
          const errorMessage = "Error creating new person";
          console.error(errorMessage, error.message);
          handleErrorNotification(errorMessage);
        });
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchName(searchTerm);
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  const handleRemove = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      numbersService
        .remove(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          setFilteredPersons((prevFilteredPersons) =>
            prevFilteredPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          const errorMessage = "Error removing person";
          console.error(errorMessage, error.message);
          handleErrorNotification(errorMessage);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorNotification message={errorNotificationMessage} />
      <Notification message={notificationMessage} />
      <Search value={searchName} onChange={handleSearch} />
      <h2>add a new</h2>
      <AddNewNumber
        onSubmit={handleSubmit}
        nameValue={newName}
        nameOnChange={handleNewNameChange}
        numberValue={newNumber}
        numberOnChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <DisplayNumbers persons={filteredPersons} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
