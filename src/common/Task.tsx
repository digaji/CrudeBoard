import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default class Task extends React.Component<any> {

  handleDelete() {
    console.log("Testing");
  }

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={false}>
        {(provided, snapshot) => (  // Snapshot used to style Draggables
          // Droppable expects child to be a function that returns React.component
          // Task
          <div
            className={`mb-2 rounded-sm border-2 border-gray-200 p-2 group bg-white ${snapshot.isDragging ? "border-black" : ""}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.task.content}
            <button className="float-right opacity-0 transition-all duration-200 hover:bg-red-300 group-hover:opacity-100" onClick={this.handleDelete}>X</button>
          </div>
        )}
      </Draggable>
    );
  }
}
