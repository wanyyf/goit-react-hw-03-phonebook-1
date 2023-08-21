import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, SubmitButton } from './PhonebookStyled';

export class Phonebook extends Component {
  state = {
    name: ``,
    number: '',
  };
  onInputsChange = e => {
    this.setState({
      [e.target.name]: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.contactAdd(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>Name</Label>
        <Input
          onChange={this.onInputsChange}
          value={this.state.name}
          type="text"
          name="name"
          pattern="^[a-zA-Z-яА-Я]+(([' -][a-zA-Z-яА-Я ])?[a-zA-Z-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Label>Number</Label>
        <Input
          onChange={this.onInputsChange}
          value={this.state.number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <SubmitButton
          type="submit"
          disabled={!this.state.name || !this.state.number}
          onClick={this.reset}
        >
          Add contact
        </SubmitButton>
      </Form>
    );
  }
}
Phonebook.propTypes = {
  contactAdd: PropTypes.func.isRequired,
};
