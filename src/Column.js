import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import CardContainer from './CardContainer';

const useStyles = makeStyles({
  container: {
    margin: '8px',
    border: '1px solid lightgrey',
    borderRadius: '2px',
    width: '220px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    padding: '8px',
  },
  taskList: {
    padding: '8px',
    transition: 'background-color 0.2s ease',
    flexGrow: 1,
    minHeight: '100px'
  }
});

export default function Column({ index, column, tasks }) {
  const classes = useStyles();

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className={classes.container}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div {...provided.dragHandleProps} className={classes.title}>
            {column.title}
          </div>
          <Droppable type="card" droppableId={column.id}>
            {(provided) => (
              <div
                className={classes.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <CardContainer tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

        </div>
      )}
    </Draggable>
  );
}


