import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import { FunctionContext } from './App';

const useStyles = makeStyles({
  card: {
    marginBottom: '0.5em',
    padding: '1em',
    borderRadius: '0.25em',
    backgroundColor: 'white',
    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 2px 0px',
  }
});

export default function Card({ task, index }) {
  const classes = useStyles();
  const cardClicked = useContext(FunctionContext);

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
          onClick={() => cardClicked(task.id)}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
}


