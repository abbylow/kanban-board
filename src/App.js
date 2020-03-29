import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogProvider } from './contexts/DialogContext';
import { ColumnsProvider } from './contexts/ColumnContext';
import { DialogRoot } from './components/DialogRoot';
import CardDetail from './components/CardDetail';
import { EditableField } from './components/EditableField';
import { Columns } from './components/Columns';
import { NewListForm } from './components/NewListForm';

const useStyles = makeStyles({
  root: {
    flex: 1,
    padding: '1em',
  },
  listContainer: {
    display: 'flex'
  },
  lists: {
    display: 'flex',
  },
  title: {
    fontWeight: 'bolder',
    fontSize: 'x-large'
  }
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EditableField placeholder={'Default Board Name'} displayClassName={classes.title} />

      <DialogProvider>
        <div className={classes.listContainer}>
          <ColumnsProvider>
            <Columns />
            <NewListForm />
          </ColumnsProvider>
        </div>
        <DialogRoot render={(props) => <CardDetail {...props} />} />
      </DialogProvider>

    </div >
  );
}

export default App;
