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
    var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    toDoArray.push(toDo);
    localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
  }

  deleteFromStorage(index) {
    var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    var toDoToDelete = toDoArray.find(toDoToDelete => toDoToDelete.id == index);
    var removeToDoId = toDoArray.indexOf(toDoToDelete);
    toDoArray.splice(removeToDoId, 1);
    localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
  }

  updateToDo() {
    //this.urgent true or false
  }

  updateTask() {
    // update if each task is checked true or false
  }
}
