import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from "./Contacts/Contacts.module.scss";

const AddContactForm = ({ addContact, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      alert("Contact with this name already exists.");
      return;
    }

    addContact({
      id: nanoid(),
      name,
      number
    });

    setName('');
    setNumber('');
  };

  const nameId = nanoid();
  const numId = nanoid();
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        id={nameId}
        type="text"
        name="name"
        pattern="^[A-Za-z]+(\s[A-Za-z]+){0,2}$"
        required
        value={name}
        onChange={handleChange}
        className={styles.input}
      />
      <label htmlFor={numId}>Phone number</label>
      <input
        id={numId}
        type="tel"
        name="number"
        pattern="^\d{9}$"
        required
        value={number}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Add contact</button>
    </form>
  );
};

AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const ContactList = ({ contacts, deleteContact, filter, handleFilterChange }) => {
  const searchId = nanoid();
  return (
    <div>
      <label htmlFor={searchId}>Find contact</label>
      <input
        type="text"
        id={searchId}
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        className={styles.input}
      />
      <ul className={styles.list}>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => (
            <li key={contact.id} className={styles.listItem}>
              {contact.name} - {contact.number}
              <button onClick={() => deleteContact(contact.id)} className={styles.deleteButton}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const updatedContacts = storedContacts.map(contact => ({
      ...contact,
      id: String(contact.id),
      number: contact.number ? String(contact.number) : ''
    }));
    setContacts(updatedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phone Book</h1>
      <AddContactForm addContact={addContact} contacts={contacts} />
      <ContactList
        contacts={contacts}
        deleteContact={deleteContact}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;