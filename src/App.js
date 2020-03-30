import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogProvider } from './contexts/DialogContext';
import { ColumnsProvider } from './contexts/ColumnContext';
import { DialogRoot } from './components/DialogRoot';
import CardDetail from './components/CardDetail';
import { EditableField } from './components/EditableField';
import { Columns } from './components/Columns';
import { NewListForm } from './components/NewListForm';
import { TasksProvider } from './contexts/TaskContext';

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: '1em',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bolder',
    fontSize: 'x-large'
  },
  listContainer: {
    flex: 1,
    display: 'flex'
  },
  newList: {
    margin: '0.5em',
    minWidth: '15em'
  }
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EditableField placeholder={'Default Board Name'} textClassName={classes.title} />

      <DialogProvider>
        <TasksProvider>
          <ColumnsProvider>
            <div className={classes.listContainer}>
              <Columns />
              <div className={classes.newList}><NewListForm /></div>
            </div>
            <DialogRoot render={(props) => <CardDetail {...props} />} />
          </ColumnsProvider>
        </TasksProvider>
      </DialogProvider>

    </div >
  );
}

export default App;
