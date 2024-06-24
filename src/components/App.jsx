import React, { Component } from 'react';
import styles from './Contacts/Contacts.module.scss';

class AddContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: ''
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handlePhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addContact({
      id: Date.now(),
      name: this.state.name,
      phone: this.state.phone
    });
    this.setState({ name: '', phone: '' });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handlePhoneChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Contact</button>
      </form>
    );
  }
}

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.listItem}>
          {contact.name} - {contact.phone}
          <button onClick={() => deleteContact(contact.id)} className={styles.deleteButton}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({ contacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact]
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phone Book</h1>
        <AddContactForm addContact={this.addContact} />
        <ContactList contacts={this.state.contacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
