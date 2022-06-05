interface data {
  tasks: any;
  columns: any;
  columnOrder: string[];
}

const dummyData: data = {
  tasks: {
    "task-1": { id: "task-1", content: "" },
    "task-2": { id: "task-2", content: "Organize the excel sheet" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Lunch with colleagues" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      colour: "bg-white",
      taskIds: ["task-1", "task-2", "task-3", "task-4"], // Saves order of tasks in the column
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      colour: "bg-orange-200",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Completed",
      colour: "bg-green-200",
      taskIds: [],
    }
  },
  // Order of the columns that will be presented
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default dummyData;
