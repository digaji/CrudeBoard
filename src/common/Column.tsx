import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { backendUrl } from "../misc/Constants";
import { Cookies } from "react-cookie";

class InnerList extends React.PureComponent<{ func: Function; tasks: any; cookies: Cookies; columnId: string }> {
  // PureComponent automatically implements shouldComponentUpdate() with state comparison, thus only rendering the tasks when needed
  render() {
    return this.props.tasks.map((task: { id: string; content: string }, index: number) => (
      <Task key={task.id} task={task} index={index} func={this.props.func} cookies={this.props.cookies} columnId={this.props.columnId} />
    ));
  }
}

export default class Column extends React.Component<{ cookies: Cookies; column: any; tasks: any; func: Function }, { newTask: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      newTask: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: { target: any }) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // @ts-ignore
    this.setState({ [name]: value });
  }

  handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Only update if the newTask is not empty
    if (this.state.newTask !== "") {
      const axiosApp = axios.create({
        baseURL: backendUrl,
        withCredentials: true,
        headers: {
          sessionid: this.props.cookies.get("sessionId"),
        },
      });

      // Add task to tasks database
      const res = await axiosApp.post("/task", { content: this.state.newTask });
      console.log(res);

      // Add task to column
      const res_column = await axiosApp.post(`/column/${this.props.column.id}/task/${res.data}`);
      console.log(res_column);

      // Reset all input
      Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));

      // Update the board
      this.props.func();

      // Reset state
      this.setState({
        newTask: "",
      });
    }
  };

  render() {
    return (
      <div className="m-2 flex w-1/3 flex-col rounded-lg bg-white">
        {/* Column Title */}
        <h1 className={`rounded-t-lg p-2 text-2xl font-medium ${this.props.column.colour}`}>{this.props.column.title}</h1>
        <Droppable droppableId={this.props.column.id}>
          {(
            provided,
            snapshot // Snapshot used to style Droppables
          ) => (
            // Droppable expects child to be a function that returns React.component
            // Tasks
            <h2
              className={`min-h-[100px] grow rounded-b-lg p-2 text-xl transition-colors ${
                snapshot.isDraggingOver ? "bg-sky-100" : "border-transparent bg-white"
              }`}
              ref={provided.innerRef} // Supply DOM Node to dnd
              {...provided.droppableProps} // Prop that need to be applied to Dropables
            >
              <InnerList tasks={this.props.tasks} func={this.props.func} cookies={this.props.cookies} columnId={this.props.column.id} />
              {provided.placeholder} {/* Increase the available size of a Droppable during a drag, needs to be the child of the component */}
            </h2>
          )}
        </Droppable>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-input my-2 ml-2 block w-[95%] rounded-sm border-2 border-gray-200 p-2"
            placeholder="Add Card"
            name="newTask"
            id="newTask"
            onChange={this.handleChange}
          />
          <button type="submit" className="mx-2 mb-2 w-1/4 rounded shadow-xl border-0 bg-sky-500 py-2 px-4 text-white hover:bg-sky-400 active:bg-sky-600">
            + Add Card
          </button>
        </form>
      </div>
    );
  }
}
