import React from "react";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { backendUrl } from "../misc/Constants";
import { Cookies } from "react-cookie";

export default class Task extends React.Component<{ cookies: Cookies; func: Function; task: any; index: any; columnId: string }, {}> {
  handleDelete = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const axiosApp = axios.create({
      baseURL: backendUrl,
      withCredentials: true,
      headers: {
        sessionid: this.props.cookies.get("sessionId"),
      },
    });

    // Delete task from column
    await axiosApp.delete(`/column/${this.props.columnId}/task/${this.props.task.id}`);

    // Delete task from task database
    await axiosApp.delete(`/task/${this.props.task.id}`);

    // Update the board
    this.props.func();
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={false}>
        {(
          provided,
          snapshot // Snapshot used to style Draggables
        ) => (
          // Droppable expects child to be a function that returns React.component
          // Task
          <div
            className={`group mb-2 rounded-sm border-2 border-gray-200 bg-white p-2 ${snapshot.isDragging ? "border-black" : ""}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.task.content}
            <button className="float-right opacity-0 transition-all duration-200 hover:bg-red-300 group-hover:opacity-100" onClick={this.handleDelete}>
              X
            </button>
          </div>
        )}
      </Draggable>
    );
  }
}
