import React from 'react';
import {
  ContactInfo,
  ContactsWrapper,
  DeleteButton,
  List,
  ListItem,
} from './ContactsListStyled.js';
import PropTypes from 'prop-types';

export const ContactsList = ({ contacs, onDeleteButton }) => {
  return (
    <ContactsWrapper>
      <List>
        {contacs.map(cont => (
          <ListItem key={cont.id}>
            <ContactInfo>
              {cont.name}: {cont.number}
            </ContactInfo>
            <DeleteButton onClick={() => onDeleteButton(cont.id)}>
              Delete
            </DeleteButton>
          </ListItem>
        ))}
      </List>
    </ContactsWrapper>
  );
};
ContactsList.propTypes = {
  onDeleteButton: PropTypes.func.isRequired,
  contacs: PropTypes.array.isRequired,
};
