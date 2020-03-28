import { useState, useRef, useEffect } from 'react';

export const useEditableField = (handleUpdate) => {
  const [text, setText] = useState('');

  const [editMode, setEditMode] = useState(false);

  const inputRef = useRef(null);

  const toggleTextEditable = () => {
    setEditMode(!editMode);
  }

  const updateText = () => {
    setText(inputRef.current.value);
    setEditMode(false);

    // call the update handling function and reset the text
    if (handleUpdate) {
      handleUpdate(inputRef.current.value);
      setText('');
    }
  }

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus()
    }
  }, [editMode, inputRef]);

  return [text, editMode, inputRef, updateText, toggleTextEditable];
}