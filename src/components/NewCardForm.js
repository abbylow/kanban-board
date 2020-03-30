import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as shortId from "shortid";
import { ColumnContext } from '../contexts/ColumnContext';
import { Add } from '@material-ui/icons';
import { EditableField } from './EditableField';

const useStyles = makeStyles({
  formContainer: {
    padding: '0.5em 0.75em',
    display: 'flex',
  },
});

export const NewCardForm = ({ columnId, setTasks, tasks }) => {
  const classes = useStyles();
  const { columns, setColumns } = useContext(ColumnContext);

  const addCard = (cardTitle) => {
    if (cardTitle) {
      const nextId = 'task-' + shortId.generate();
      setTasks({
        ...tasks,
        [nextId]: {
          id: nextId,
          title: cardTitle,
          description: ''
        }
      });
      setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          taskIds: [...columns[columnId].taskIds, nextId]
        }
      });
    }
  }

  const renderIcon = () => <Add />

  return (
    <EditableField displayIcon={renderIcon} className={classes.formContainer} placeholder={'Add A New Card'} handleUpdate={addCard} />
  )
}