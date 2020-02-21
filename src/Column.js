import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import CardContainer from './CardContainer';

const useStyles = makeStyles({
  container: {
    margin: '0.5em',
    backgroundColor: '#ebecf0',
    borderRadius: '0.25em',
    width: '15em',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    padding: '0.5em 0.75em',
    fontWeight: 'bolder',
    fontSize: 'large'
  },
  taskList: {
    padding: '0.5em',
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


