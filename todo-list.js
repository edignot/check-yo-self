class ToDoList {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = false;
  }
  saveToStorage(toDo) {
    window.localStorage.setItem(this.id, JSON.stringify(toDo));
  }
  deleteFromStorage() {
    window.localStorage.removeItem(this.id);
  }

  updateToDo() {
    //should update the todo’s title and urgency)
  }

  updateTask() {
    //should update a task’s content and if it has been completed
    // The update of the data model should occur in the updateTask method that is defined in the ToDoList class.
  }
}
