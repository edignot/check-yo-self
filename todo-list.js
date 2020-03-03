class ToDo {
  constructor(title, tasks, id, urgent) {
    this.title = title;
    this.tasks = tasks || [];
    this.id = id || Date.now();
    this.urgent = urgent || false;
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

  updateTask(clickedId, toDoId) {
    var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    for (var i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].id == toDoId) {
        var toDoToUpdate = toDoArray[i];
        var toDoToUpdateId = toDoArray.indexOf(toDoToUpdate);
        var taskToUpdate = toDoToUpdate.tasks.find(taskToUpdate => taskToUpdate.id == clickedId);
        taskToUpdate.checked = true;
      }
    }
  }
}
