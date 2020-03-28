import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEditableField } from '../hooks/useEditableField';
import { TextField, IconButton } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    margin: '0.25em 0.5em',
  }
});

export const EditableField = ({ placeholder = 'Enter some text...', displayClassName, handleUpdate }) => {
  const classes = useStyles();

  const [text, editMode, inputRef, updateText, toggleTextEditable] = useEditableField(handleUpdate);

  return (
    <div className={classes.container}>
      {
        editMode ? (
          <div>
            <TextField placeholder={placeholder} defaultValue={text} inputRef={inputRef} />
            <IconButton color="primary" onClick={updateText}><Check /></IconButton>
            <IconButton color="secondary" onClick={toggleTextEditable}><Close /></IconButton>
          </div >
        ) :
          <div className={displayClassName} onClick={toggleTextEditable}>
            {text ? text : placeholder}
          </div>
      }
    </div>
  )
}


EditableField.propTypes = {
  placeholder: PropTypes.string,
  displayClassName: PropTypes.string,
  handleUpdate: PropTypes.func,
}
