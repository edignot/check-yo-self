class ToDo {
  constructor(title, tasks) {
    this.title = title;
    this.tasks = tasks || [];
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

  updateToDo(id) {
    var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    var toDo = toDoArray.find(toDo => toDo.id == id);
    toDo.urgent = true;
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
