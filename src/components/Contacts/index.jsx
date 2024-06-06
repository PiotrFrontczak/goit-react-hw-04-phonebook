import { nanoid } from "nanoid";
import { Component } from "react";
import styles from "./Contacts.module.scss";

export default class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      name: "",
      number: "",
      filter: "",
    };
  }

  handleChange = (ev) => {
    const { name, value } = ev.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { contacts, name } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      alert("Contact with this name already exists.");
      return;
    }

    this.setState((prev) => {
      const list = [...prev.contacts];
      list.push({
        id: nanoid(),
        name: this.state.name,
        number: this.state.number,
      });
      return { contacts: list, name: "", number: "" };
    });
  };

  handleDelete = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter(contact => contact.id !== id)
    }));
  };

  render() {
    const nameId = nanoid();
    const numId = nanoid();
    const searchId = nanoid();
    return (
      <>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label htmlFor={nameId}>Name</label>
          <input
            id={nameId}
            type="text"
            name="name"
            pattern="^[A-Za-z]+(\s[A-Za-z]+){0,2}$"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor={numId}>Phone number</label>
          <input
            id={numId}
            type="tel"
            name="number"
            pattern="^\d{9}$"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
          <button type="submit">Add contact</button>
        </form>
        <h1>Contacts</h1>
        <label htmlFor={searchId}>Find contact</label>
        <input
          type="text"
          id={searchId}
          name="filter"
          value={this.state.filter}
          onChange={this.handleChange}
        />
        <ul className={styles.list}>
          {this.state.contacts
            .filter((el) =>
              el.name.toLowerCase().includes(this.state.filter.toLowerCase()),
            )
            .map((contact) => (
              <li key={contact.id}>
                {contact.name} - {contact.number}
                <button onClick={() => this.handleDelete(contact.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </>
    );
  }
}
