import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
    { id: nanoid(), name: 'dArtagnan', number: '132-14-88' },
    ],
    filter: '',
  };

  componentDidMount() {
   const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts) {
      this.setState({
        contacts,
      });
    }
  }
  componentDidUpdate(prPrs, {contacts}) {
    if (contacts !== this.state.contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.some(el => el.name === name)) {
      return alert(`${name} is already in contacts.`);
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  removeContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizeInput = filter.toLowerCase();
    const renderArr = contacts.filter(el =>
      el.name.toLowerCase().includes(normalizeInput)
    );
    return renderArr;
  };

  render() {
    const { addContact, handleFilter, removeContact } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContact();
    return (
      <div>
        <h1 className="titleOne">Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2 className="titleTwo">Contacts</h2>
        <Filter value={filter} onChange={handleFilter} />
        <ContactList contacts={contacts} removeContact={removeContact} />
      </div>
    );
  }
}
