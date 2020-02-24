import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { EditorComponent } from './Editor';

export default function CardDetail({ dialogIsOpen, handleClose, ...otherProps }) {
  const { selectedTask } = otherProps;

  return (
    <Dialog open={dialogIsOpen} onClose={handleClose} fullWidth>
      <DialogTitle>{selectedTask && selectedTask.title} </DialogTitle>
      <DialogContent>

        <EditorComponent description={selectedTask && selectedTask.description} />

      </DialogContent>
    </Dialog>
  );
}