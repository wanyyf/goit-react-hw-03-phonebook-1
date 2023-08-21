import React from 'react';
import { Input, Label } from '../Phonebook/PhonebookStyled';
import PropTypes from 'prop-types';
export const FilterCont = ({ filterCont }) => {
  return (
    <div>
      <Label>Find contacts by name</Label>
      <Input onChange={filterCont} type="text" name="filter" />
    </div>
  );
};
FilterCont.propTypes = {
  filterCont: PropTypes.func.isRequired,
};
