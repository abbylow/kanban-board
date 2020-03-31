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

export const EditableField = ({ displayIcon, className, placeholder = 'Enter some text...', textClassName, handleUpdate }) => {
  const classes = useStyles();

  const [text, editMode, inputRef, updateText, toggleTextEditable] = useEditableField(handleUpdate);

  return (
    <div className={className}>
      {
        displayIcon && !editMode && (
          <div onClick={toggleTextEditable}>
            {displayIcon()}
          </div>
        )
      }

      <div className={classes.container}>
        {
          editMode ? (
            <div>
              <TextField placeholder={placeholder} defaultValue={text} inputRef={inputRef}/>
              <IconButton color="primary" onClick={updateText}><Check /></IconButton>
              <IconButton color="secondary" onClick={toggleTextEditable}><Close /></IconButton>
            </div >
          ) :
            <div className={textClassName} onClick={toggleTextEditable}>
              {text ? text : placeholder}
            </div>
        }
      </div>
    </div>


  )
}


EditableField.propTypes = {
  displayIcon: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  textClassName: PropTypes.string,
  handleUpdate: PropTypes.func,
}
