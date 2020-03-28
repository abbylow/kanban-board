import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as shortId from "shortid";
import { Add } from '@material-ui/icons';
import { EditableField } from './EditableField';

const useStyles = makeStyles({
  newList: {
    margin: '0.5em',
    minWidth: '15em'
  },
  innerNewList: {
    padding: '0.5em',
    borderRadius: '0.25em',
    backgroundColor: 'rgb(235, 236, 240, .5)',
    display: 'flex'
  }
});


export const NewListForm = ({ columns, setColumns, columnOrder, setColumnOrder }) => {
  const classes = useStyles();

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

  return (
    <div className={classes.newList}>
      <div className={classes.innerNewList}>
        <Add />
        <EditableField placeholder={'Add A New List'} handleUpdate={addList} />
      </div>
    </div>
  )
}