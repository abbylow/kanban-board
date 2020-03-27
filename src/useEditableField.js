import React, { useState, useRef } from 'react';

export const useEditableField = (defaultText, emptyText) => {
  const [text, setText] = useState(defaultText);

  const [editMode, setEditMode] = useState(false);

  const inputRef = useRef(null);

  const makeTextEditable = () => {
    setEditMode(true);
  }

  const updateText = () => {
    if(inputRef.current.value){
      setText(inputRef.current.value);
    }
    else {
      setText(emptyText);
    }
    setEditMode(false);
  }

  return [text, editMode, inputRef, updateText, makeTextEditable];
}