import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ColumnContainer } from './ColumnContainer';
import { TasksProvider } from '../contexts/TaskContext';
import { handleCardMovement, handleListMovement } from '../services/handleMovement';
import { ColumnContext } from '../contexts/ColumnContext';

const useStyles = makeStyles({
  lists: {
    display: 'flex',
  },
  title: {
    fontWeight: 'bolder',
    fontSize: 'x-large'
  }
});

export const Columns = () => {
  const classes = useStyles();
  const { columns, setColumns, columnOrder, setColumnOrder } = useContext(ColumnContext);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'list') {
      let newColumnOrder = handleListMovement(columnOrder, destination, source, draggableId);
      setColumnOrder(newColumnOrder);
    }
    else {
      let newColumns = handleCardMovement(columns, destination, source, draggableId);
      setColumns(newColumns);
    }
    return;
  }

  return (
    <TasksProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="list" >
          {(provided) => (
            <div className={classes.lists} {...provided.droppableProps} ref={provided.innerRef}>
              {columnOrder.map((columnId, index) => {
                return (
                  <ColumnContainer
                    key={columnId}
                    index={index}
                    columnId={columnId}
                    columns={columns}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </TasksProvider>
  );
}
