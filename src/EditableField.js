import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEditableField } from './useEditableField';
import { TextField, IconButton } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    margin: '0.25em 0.5em',
  }
});

export const EditableField = ({ defaultText='Default Text', emptyText='Empty Text', displayClassName }) => {
  const classes = useStyles();

  const [text, editMode, inputRef, updateText, toggleTextEditable] = useEditableField(defaultText, emptyText);

  return (
    <div className={classes.container}>
      {
        editMode ? (
          <div>
            <TextField defaultValue={text} inputRef={inputRef} />
            <IconButton color="primary" onClick={updateText}><Check /></IconButton>
            <IconButton color="secondary" onClick={toggleTextEditable}><Close /></IconButton>
          </div >
        ) :
          <div className={displayClassName} onClick={toggleTextEditable}>
            {text}
          </div>
      }
    </div>
  )
}


EditableField.propTypes = {
  defaultText: PropTypes.string,
  emptyText: PropTypes.string,
  className: PropTypes.string,
}
