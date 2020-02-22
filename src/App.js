import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ColumnContainer } from './ColumnContainer';
import { DialogProvider } from './DialogContext';
import { DialogRoot } from './DialogRoot';
import CardDialog from './CardDialog';

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: '1em',
  },
  title: {
    margin: '0.25em 0.5em',
    fontWeight: 'bolder',
    fontSize: 'x-large'
  },
  lists: {
    display: 'flex',
  }
});

function App() {
  const classes = useStyles();

  const [columnOrder, setColumnOrder] = useState(['column-1', 'column-2', 'column-3']);

  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', title: "Take out the garbages", description: "Description of the task - Take out the garbages" },
    'task-2': { id: 'task-2', title: "Watch my favorite show", description: "Description of the task - Watch my favorite show" },
    'task-3': { id: 'task-3', title: "Charge my phone", description: "Description of the task - Charge my phone" },
    'task-4': { id: 'task-4', title: "Cook dinner", description: "Description of the task - Cook dinner" },
  });

  const [columns, setColumns] = useState({
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  });

  function handleListMovement(destination, source, draggableId) {
    const newColumnOrder = Array.from(columnOrder);
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, draggableId);
    setColumnOrder(newColumnOrder);
    return;
  }

  function reorderCards(destination, source, draggableId) {
    const selectedColumn = columns[source.droppableId];

    const newTaskIds = Array.from(selectedColumn.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    setColumns({
      ...columns,
      [selectedColumn.id]: { ...selectedColumn, taskIds: newTaskIds }
    });
    return;
  }

  function moveCardAcrossList(destination, source, draggableId) {
    const startColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };

    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.splice(destination.index, 0, draggableId);
    const newDestinationColumn = { ...destinationColumn, taskIds: destinationTaskIds };

    setColumns({
      ...columns,
      [newStartColumn.id]: newStartColumn,
      [newDestinationColumn.id]: newDestinationColumn
    })
    return;
  }

  function handleCardMovement(destination, source, draggableId) {
    if (source.droppableId === destination.droppableId) {
      reorderCards(destination, source, draggableId);
    }
    else {
      moveCardAcrossList(destination, source, draggableId);
    }
    return;
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'list') {
      handleListMovement(destination, source, draggableId);
    }
    else {
      handleCardMovement(destination, source, draggableId);
    }
    return;
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        Kanban Board
      </div>
      <DialogProvider>
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
                      tasks={tasks}
                      columns={columns}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <DialogRoot component={CardDialog} />
      </DialogProvider>

    </div >
  );
}

export default App;
