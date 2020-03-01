class ToDoList {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = false;
  }

  saveToStorage(toDo) {
    var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    toDoArray.push(toDo);
    localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
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
