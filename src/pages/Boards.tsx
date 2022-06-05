import React from "react";
import dummyData from "../misc/DummyData";
import Column from "../common/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Cookies } from "react-cookie";
import axios from "axios";
import { backendUrl } from "../misc/Constants";

class Boards extends React.Component<{ cookies: Cookies }, {}> {
  state = dummyData;

  async componentDidMount() {
    // Overwrite column data from backend
    const res_column = await axios.get(backendUrl + "/column", { withCredentials: true });

    // Overwrite task data from backend
    const res_task = await axios.get(backendUrl + "/task", { withCredentials: true });
    this.setState({
      columns: res_column.data,
      tasks: res_task.data
    });
    console.log(this.state);
  }

  onDragEnd = async (result: DropResult) => {
    // Reorder our column
    const { destination, source, draggableId } = result;
    console.log(source)

    // If no destination, do nothing
    if (!destination) {
      return;
    }

    // If the destination is the same as source, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = this.state.columns[source.droppableId]; // Starting column
    const finishColumn = this.state.columns[destination.droppableId]; // End column

    if (startColumn === finishColumn) {
      // If the task is being dragged to the same column
      const newTaskIds = Array.from(startColumn.taskIds); // Create copy from previous array
      newTaskIds.splice(source.index, 1); // Modify newTaskIds by removing 1 item from source index
      newTaskIds.splice(destination.index, 0, draggableId); // Remove nothing, insert new task

      const newColumn = {
        ...startColumn, // Same content as previous column
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
      await axios.post(backendUrl + `/column/${source.droppableId}/task`, newTaskIds, { withCredentials: true });
    } else {
      // If the task is being dragged to a different column
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStart = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      this.setState(newState);
      // TODO: Call end point to let server know that reorder has occured
      await axios.post(backendUrl + `/column/${source.droppableId}/task`, startTaskIds, { withCredentials: true });
      await axios.post(backendUrl + `/column/${destination.droppableId}/task`, finishTaskIds, { withCredentials: true });
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="flex px-5">
          {this.state.columnOrder.map((columnId) => {
            // Column data
            const column = this.state.columns[columnId];
            // All task data
            const tasks = column.taskIds.map((taskId: string) => this.state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    );
  }
}

export default Boards;
