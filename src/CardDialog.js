import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

export default function CardDialog({ open, onClose, otherProps }) {
  const { selectedTask } = otherProps;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedTask && selectedTask.title} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {selectedTask && selectedTask.description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}