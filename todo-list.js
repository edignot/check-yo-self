class ToDo {
  constructor(title, tasks, id, urgent) {
    this.title = title;
    this.tasks = tasks || [];
    this.id = id || Date.now();
    this.urgent = urgent || false;
    this.completed = false;
  }

  saveToStorage(toDo) {
    var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    toDoArray.push(toDo);
    localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
  }
}
