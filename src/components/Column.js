import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card } from './Card';
import { NewCardForm } from './NewCardForm';
import { TaskContext } from '../contexts/TaskContext';

const useStyles = makeStyles({
  container: {
    margin: '0.5em',
    backgroundColor: '#ebecf0',
    borderRadius: '0.25em',
    width: '15em',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh'
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
    overflow: 'scroll'
  }
});

export default function Column({ index, column }) {
  const classes = useStyles();
  const { tasks, setTasks } = useContext(TaskContext);
  const myTasks = column.taskIds.map(taskId => tasks[taskId]);

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
          <NewCardForm columnId={column.id} setTasks={setTasks} tasks={tasks} />
          <Droppable type="card" droppableId={column.id}>
            {(provided) => (
              <div
                className={classes.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {myTasks.map((task, index) =>
                  <Card key={task.id} task={task} index={index} />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}


