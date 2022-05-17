import React from "react";
import dummyData from "../misc/DummyData";
import Column from "../misc/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

class Board extends React.Component {
  state = dummyData;

  onDragEnd = (result: DropResult) => {
    // Reorder our column
    const { destination, source, draggableId } = result;

    // If no destination, do nothing
    if (!destination) {
      return;
    }

    // If the destination is the same as source, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds); // Create copy from previous array
    newTaskIds.splice(source.index, 1); // Modify newTaskIds by removing 1 item from source index
    newTaskIds.splice(destination.index, 0, draggableId); // Remove nothing, insert new task

    const newColumn = {
      ...column, // Same content as previous column
      taskIds: newTaskIds,
    };

    // New state by invalidating old state
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn, // Override previous column
      },
    };

    this.setState(newState);
    // TODO: Call end point to let server know that reorder has occured
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          // Column data
          const column = this.state.columns[columnId];
          // All task data
          const tasks = column.taskIds.map((taskId: string) => this.state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default function Boards(): JSX.Element {
  return <Board />;
}
