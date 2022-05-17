interface data {
  tasks: any;
  columns: any;
  columnOrder: string[];
}

const dummyData: data = {
  tasks: {
    "task-1": { id: "task-1", content: "Do web app project" },
    "task-2": { id: "task-2", content: "Organize the excel sheet" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Lunch with colleagues" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"], // Saves order of tasks in the column
    },
  },
  // Order of the columns that will be presented
  columnOrder: ["column-1"],
};

export default dummyData;
