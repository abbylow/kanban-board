import React, { useState, createContext } from 'react';

export const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [otherProps, setOtherProps] = useState({});

  const handleOpen = (customizedProps) => {
    setDialogIsOpen(true);
    setOtherProps(customizedProps);
  };

  const handleClose = () => {
    setDialogIsOpen(false);
    setOtherProps({});
  };

  return (
    <DialogContext.Provider value={{ dialogIsOpen, handleOpen, handleClose, ...otherProps }}>
      {children}
    </DialogContext.Provider>
  );
}

