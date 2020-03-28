import { useContext } from 'react';
import { DialogContext } from '../contexts/DialogContext';

export const DialogRoot = ({ render }) => {
  const { dialogIsOpen, handleClose, ...otherProps } = useContext(DialogContext);
  return render({ dialogIsOpen, handleClose, ...otherProps });
}
