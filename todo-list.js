class ToDoList {
  constructor(title) {
    this.title = title;
    this.tasks = [];
    this.id = Date.now();
    this.urgent = false;
  }

  updateTitle() {
    this.title = taskTitleInput.value;
  }

  updateTaskArray(task) {
    this.tasks.push(task);
  }

  saveToStorage(toDo) {
    // var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    // toDoArray.push(toDo);
    // localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
  }

  deleteFromStorage(index) {
    // var toDoArray = JSON.parse(localStorage.getItem('toDoArray'))
    // toDoArray.splice(index, 1);
    // localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
  }

  updateToDo() {
    //should update the todo’s title and urgency)
  }

  updateTask() {
    //update a task’s content and if it has been completed
  }
}
