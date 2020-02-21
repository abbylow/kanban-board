import React from 'react';
import Column from './Column';

export default class ColumnContainer extends React.PureComponent {
  render() {
    const { index, column, taskMap } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column column={column} tasks={tasks} index={index} />;
  }
}