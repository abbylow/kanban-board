import React from 'react';
import Card from './Card';

export default class CardContainer extends React.PureComponent {
  render() {
    return this.props.tasks.map((task, index) =>
      <Card key={task.id} task={task} index={index} />
    );
  }
}
