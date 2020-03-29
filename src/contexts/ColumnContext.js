import React, { useState, createContext } from 'react';

export const ColumnContext = createContext();

export const ColumnsProvider = ({ children }) => {
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

  const [columnOrder, setColumnOrder] = useState(['column-1', 'column-2', 'column-3']);

  return (
    <ColumnContext.Provider value={{ columns, setColumns, columnOrder, setColumnOrder }}>
      {children}
    </ColumnContext.Provider>
  );
}

