import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

export default function CardDialog({ tasks, open, handleClose, selectedTask }) {
  const task = tasks[selectedTask];

  //TODO: make inline change text field and rich text editor
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task ? task.title : ''}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {task ? task.description : ''}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}


