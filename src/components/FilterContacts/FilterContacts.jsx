import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContactList from '../ContactList/ContactList';
import styles from './FilterContacts.module.css';

class FilterContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, deleteContact } = this.props;
    const { filter } = this.state;

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
            onChange={this.handleFilterChange}
            placeholder="Find contact by name"
          />
        </div>
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      </div>
    );
  }
}

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
