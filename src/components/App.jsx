import React, { Component } from 'react';
import { Phonebook } from './Phonebook/Phonebook';
import { ContactsList } from './Contacts/ContactsList';
import { FilterCont } from './FilterCont/FilterCont';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const prevCont = JSON.parse(localStorage.getItem('contacts'));
    console.log(prevCont);
    if (prevCont) {
      this.setState({ contacts: prevCont });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log(JSON.stringify(this.state.contacts));
    }
  }
  getContact = PhonebookState => {
    const { name, number } = PhonebookState;
    if (
      this.state.contacts
        .map(item => item.name.toLowerCase() === name.toLowerCase())
        .includes(true)
    ) {
      alert(name + ` is already in contacts`);
    } else {
      const nanoId = nanoid();
      this.setState(prev => ({
        contacts: [...prev.contacts, { name, id: nanoId, number }],
      }));
    }
  };

  onDeleteButton = id => {
    this.setState(prevState => {
      const updatedContacts = prevState.contacts.filter(item => item.id !== id);
      return { contacts: updatedContacts };
    });
  };

  handleFilterValue = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    return this.state.contacts.filter(item =>
      item.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );
  };
  render() {
    return (
      <StyledSection>
        <StyledTitle>Phonebook</StyledTitle>
        <Phonebook contactAdd={this.getContact} />
        <FilterCont filterCont={this.handleFilterValue} />
        <StyledTitle>Contacts</StyledTitle>
        {this.filterContacts().length === 0 ? (
          <WarningText>Nothing there!</WarningText>
        ) : (
          <ContactsList
            contacs={this.filterContacts()}
            onDeleteButton={this.onDeleteButton}
          />
        )}
      </StyledSection>
    );
  }
}
const StyledSection = styled.section`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;
const WarningText = styled.p`
  color: orange;
  font-size: 16px;
  margin-top: 10px;
`;
App.propTypes = {
  id: PropTypes.number,
  PhonebookState: PropTypes.object,
};
