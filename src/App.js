import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ColumnContainer } from './ColumnContainer';
import { DialogProvider } from './DialogContext';
import { DialogRoot } from './DialogRoot';
import CardDetail from './CardDetail';
import { handleCardMovement, handleListMovement } from './handleMovement';

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


  function onDragEnd(result) {
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

        {/* TODO: how to make this dialog root accepts different type of component? Use another context to control? */}
        <DialogRoot component={CardDetail} />
      </DialogProvider>

    </div >
  );
}

export default App;
