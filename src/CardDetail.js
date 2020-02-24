import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

export default function CardDetail({ dialogIsOpen, handleClose, ...otherProps }) {
  const { selectedTask } = otherProps;

  return (
    <Dialog open={dialogIsOpen} onClose={handleClose}>
      <DialogTitle>{selectedTask && selectedTask.title} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {selectedTask && selectedTask.description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}