import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default class Task extends React.Component<any> {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (  // Snapshot used to style Draggables
          // Droppable expects child to be a function that returns React.component
          // Task
          <div
            className={`mb-2 rounded-sm border-2 border-gray-200 p-2 ${snapshot.isDragging ? "bg-green-100" : "bg-white"}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.task.content}
          </div>
        )}
      </Draggable>
    );
  }
}
