import React, { useContext } from 'react';
import { DialogContext } from './DialogContext';

export const DialogRoot = ({ component: Component }) => {
  const { dialogIsOpen, handleClose, otherProps } = useContext(DialogContext);
  return Component ? <Component open={dialogIsOpen} onClose={handleClose} otherProps={otherProps} /> : null
}
