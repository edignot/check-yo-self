class ToDoList {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title;
    this.tasks = []; //each task in an array is an object
    this.urgent = false;
  }
  saveToStorage() {
    // save instance of toDoList to local storage
    JSON.stringify(this);
    //save to local storage
  }
  deleteFromStorage() {
    // if removeToDoVard() passes all conditions remove todo , update this.tasks
  }

  updateToDo() {
    //should update the todo’s title and urgency)
  }

  updateTask() {
    //should update a task’s content and if it has been completed
    // The update of the data model should occur in the updateTask method that is defined in the ToDoList class.
  }
}
