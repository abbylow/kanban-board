import React, { useState, createContext } from 'react';

export const TaskContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', title: "Take out the garbages", description: "" },
    'task-2': { id: 'task-2', title: "Watch my favorite show", description: "" },
    'task-3': { id: 'task-3', title: "Charge my phone", description: "" },
    'task-4': { id: 'task-4', title: "Cook dinner", description: "" },
  });

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

