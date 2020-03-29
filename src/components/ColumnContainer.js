import React from 'react';
import Column from './Column';

export const ColumnContainer = React.memo(({ columns, index, columnId }) => {
  const column = columns[columnId];
  return <Column column={column} index={index} />;
});
