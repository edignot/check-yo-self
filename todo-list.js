class ToDoList {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title;
    this.tasks = []; //each task in an array is an object
    this.urgent = false;
  }
  saveToStorage() {
    var newToDo =  {
      id: this.id,
      title: this.title,
      urgent: this.urgent,
      tasks: this.tasks,
    };
    window.localStorage.setItem(this.id, JSON.stringify(newToDo));
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
