import React from 'react';
import Column from './Column';

export const ColumnContainer = React.memo(({ tasks, columns, index, columnId }) => {
  const column = columns[columnId];
  const myTasks = column.taskIds.map(taskId => tasks[taskId]);
  return <Column column={column} tasks={myTasks} index={index} />;
});
