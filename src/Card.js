import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
  card: {
    marginBottom: '8px',
    padding: '8px',
    border: '1px solid lightgrey',
    borderRadius: '2px',
    backgroundColor: 'white',
  }
});

export default function Card({ task, index }) {
  const classes = useStyles();

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
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}


