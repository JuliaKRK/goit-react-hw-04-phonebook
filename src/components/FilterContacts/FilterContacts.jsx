import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContactList from '../ContactList/ContactList';
import styles from './FilterContacts.module.css';

const FilterContacts = ({ contacts, deleteContact }) => {
  const [filter, setFilter] = useState('');

  // const handleFilterChange = event => {
  //   setFilter(event.target.value);
  // };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <p className={styles.filterText}>Find contact by name</p>
        <input
          className={styles.filterInput}
          type="text"
          value={filter}
          onChange={event => setFilter(event.target.value)}
          placeholder="Find contact by name"
        />
      </div>
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};

FilterContacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default FilterContacts;
