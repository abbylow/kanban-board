import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import { EditableField } from './EditableField';
import { ColumnContext } from '../contexts/ColumnContext';

const useStyles = makeStyles({
  buttonArea: {
    padding: '0.5em 0.75em',
    display: 'flex',
    justifyContent: 'space-between'
  },
  renameArea: {
    display: 'flex'
  },
});

export const ColumnFooter = ({column}) => {
  const classes = useStyles();

  const { columns, setColumns, columnOrder, setColumnOrder } = useContext(ColumnContext);

  const deleteList = () => {
    let newColumns = { ...columns };
    delete newColumns[column.id];
    setColumns(newColumns);

    let newColumnOrder = Array.from(columnOrder);
    setColumnOrder(newColumnOrder.filter(el => el !== column.id));
  }

  const renameList = (newListTitle) => {
    let newColumns = { ...columns };
    setColumns({ ...newColumns, [column.id]: { ...columns[column.id], title: newListTitle } });
  }

  return (
    <div className={classes.buttonArea}>
      <EditableField
        displayIcon={() => <EditOutlined />}
        className={classes.renameArea} placeholder={'Rename List'}
        handleUpdate={renameList}
      />
      <DeleteOutline onClick={deleteList} />
    </div>
  )
}