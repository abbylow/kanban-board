import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as shortId from "shortid";
import { ColumnContext } from '../contexts/ColumnContext';
import { Add } from '@material-ui/icons';
import { EditableField } from './EditableField';

const useStyles = makeStyles({
  innerNewList: {
    padding: '0.5em',
    borderRadius: '0.25em',
    backgroundColor: 'rgb(235, 236, 240, .5)',
    display: 'flex'
  }
});

export const NewListForm = () => {
  const classes = useStyles();
  const { columns, setColumns, columnOrder, setColumnOrder } = useContext(ColumnContext);

  const addList = (listTitle) => {
    if (listTitle) {
      const nextId = 'column-' + shortId.generate();
      setColumns({
        ...columns,
        [nextId]: {
          id: nextId,
          title: listTitle,
          taskIds: []
        }
      });
      setColumnOrder([...columnOrder, nextId]);
    }
  }

  const renderIcon = () => <Add />

  return (
    <EditableField displayIcon={renderIcon} className={classes.innerNewList} placeholder={'Add A New List'} handleUpdate={addList} />
  )
}