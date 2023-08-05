import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import FilterContacts from './FilterContacts/FilterContacts';
import styles from './App.module.css';

const App = () => {
  const storedContacts = localStorage.getItem('contacts');
  const initialContacts = storedContacts
    ? JSON.parse(storedContacts)
    : [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];

  const [contacts, setContacts] = useState(initialContacts);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const existingContact = contacts.find(contact => contact.name === name);

    if (existingContact) {
      alert(`Contact with name ${name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <FilterContacts contacts={contacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
