import React, { useContext } from 'react';
import { DialogContext } from '../contexts/DialogContext';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  card: {
    marginBottom: '0.5em',
    padding: '1em',
    borderRadius: '0.25em',
    backgroundColor: 'white',
    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 2px 0px',
  }
});

export const Card = ({ task, index }) => {
  const classes = useStyles();
  const { handleOpen } = useContext(DialogContext);

  return (
    <Draggable
      draggableId={task.id}
      index={index}
    >
      {(provided) => (
        <div
          className={classes.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => handleOpen({ selectedTask: task })} //can pass the other variables for different dialog purposes
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
}


