
export function handleListMovement(columnOrder, destination, source, draggableId) {
  const newColumnOrder = Array.from(columnOrder);
  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);
  return newColumnOrder;
}

function reorderCards(columns, destination, source, draggableId) {
  const selectedColumn = columns[source.droppableId];

  const newTaskIds = Array.from(selectedColumn.taskIds);
  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);

  return {
    ...columns,
    [selectedColumn.id]: { ...selectedColumn, taskIds: newTaskIds }
  };
}

function moveCardAcrossList(columns, destination, source, draggableId) {
  const startColumn = columns[source.droppableId];
  const destinationColumn = columns[destination.droppableId];

  const startTaskIds = Array.from(startColumn.taskIds);
  startTaskIds.splice(source.index, 1);
  const newStartColumn = { ...startColumn, taskIds: startTaskIds };

  const destinationTaskIds = Array.from(destinationColumn.taskIds);
  destinationTaskIds.splice(destination.index, 0, draggableId);
  const newDestinationColumn = { ...destinationColumn, taskIds: destinationTaskIds };

  return {
    ...columns,
    [newStartColumn.id]: newStartColumn,
    [newDestinationColumn.id]: newDestinationColumn
  }
}

export function handleCardMovement(columns, destination, source, draggableId) {
  if (source.droppableId === destination.droppableId) {
    return reorderCards(columns, destination, source, draggableId);
  }
  return moveCardAcrossList(columns, destination, source, draggableId);
}