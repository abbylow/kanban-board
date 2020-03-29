import React, { useState, createContext } from 'react';

export const TaskContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', title: "Take out the garbages", description: "Description of the task - Take out the garbages" },
    'task-2': { id: 'task-2', title: "Watch my favorite show", description: "Description of the task - Watch my favorite show" },
    'task-3': { id: 'task-3', title: "Charge my phone", description: "Description of the task - Charge my phone" },
    'task-4': { id: 'task-4', title: "Cook dinner", description: "Description of the task - Cook dinner" },
  });

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

