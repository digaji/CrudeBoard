import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

export default class Column extends React.Component<any> {
  render() {
    return (
      <div className="m-2 flex flex-col rounded-sm border-2 border-gray-200 bg-white">
        {/* Column Title */}
        <h1 className="p-2 text-2xl font-medium">{this.props.column.title}</h1>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (  // Snapshot used to style Droppables
            // Droppable expects child to be a function that returns React.component
            // Tasks
            <h2
              className={`p-2 text-xl transition-colors ${snapshot.isDraggingOver ? "bg-sky-200" : "bg-white"}`}
              ref={provided.innerRef} // Supply DOM Node to dnd
              {...provided.droppableProps} // Prop that need to be applied to Dropables
            >
              {this.props.tasks.map((task: { id: string; content: string }, index: number) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder} {/* Increase the available size of a Droppable during a drag, needs to be the child of the component */}
            </h2>
          )}
        </Droppable>
      </div>
    );
  }
}
