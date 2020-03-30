import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import { DeleteOutline, Close, EditOutlined, FlagOutlined } from '@material-ui/icons';
import { EditableField } from './EditableField';
import { TaskContext } from '../contexts/TaskContext';
import { EditorComponent } from './Editor';
import { ColumnContext } from '../contexts/ColumnContext';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.25em'
  },
  flag: {
    padding: '1em',
    display: 'flex'
  },
  formContainer: {
    display: 'flex',
  },
  titleArea: {
    margin: '0.5em 1em'
  },
  titleText: {
    fontWeight: 'bolder',
    fontSize: 'x-large'
  }
});

export default function CardDetail({ dialogIsOpen, handleClose, ...otherProps }) {
  const { selectedTaskId, selectedColumnId } = otherProps;
  const classes = useStyles();

  const { tasks, setTasks } = useContext(TaskContext);
  
  //TODO: make this function able to update any field, not limit to title
  const renameCardTitle = (newCardTitle) => {
    const updatedField = { title: newCardTitle };
    setTasks({ ...tasks, [selectedTaskId]: { ...tasks[selectedTaskId], ...updatedField } })
  }

  const { columns, setColumns } = useContext(ColumnContext);
  const deleteCard = () => {
    let newTaskIds = [...columns[selectedColumnId].taskIds];
    newTaskIds = newTaskIds.filter(task => task != selectedTaskId);
    let newColumns = { ...columns, [selectedColumnId]: { ...columns[selectedColumnId], taskIds: newTaskIds } }
    setColumns(newColumns);

    let newTasks = { ...tasks };
    delete newTasks[selectedTaskId];
    setTasks(newTasks);

    handleClose();
  }

  const renderIcon = () => <EditOutlined />

  return (
    <Dialog open={dialogIsOpen} onClose={handleClose} fullWidth>
      <div className={classes.header}>
        <div className={classes.flag}>
          <FlagOutlined />
          <Typography variant="overline">{selectedTaskId}</Typography>
        </div>
        <div>
          <IconButton onClick={deleteCard}>
            <DeleteOutline />
          </IconButton>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </div>
      </div>
      <div className={classes.titleArea}>
        <EditableField
          displayIcon={renderIcon}
          className={classes.formContainer}
          textClassName={classes.titleText}
          placeholder={tasks && tasks[selectedTaskId] && tasks[selectedTaskId].title}
          handleUpdate={renameCardTitle}
        />
      </div>
      <DialogContent>
        {/* TODO: make a place for human to edit the tasks */}
        {/* Rich text editor */}
        {/* Checklist */}
        {/* <EditorComponent description={tasks && tasks[selectedTaskId] && tasks[selectedTaskId].description} /> */}

      </DialogContent>

    </Dialog>
  );
}