// all DOM related javaScrip


function displayToDo() {
  //display all existing to does when visiting application
  //sort todoes so most recent to does displayed top left
}

function addTask() {
  //add task to the dom



}

function makeList() {
  // create id counter++
  // get Title queryselector
  // get tasks queryselector array of strings
  // loop through array of tasks and creating new instances of a task


  var toDoList = new ToDoList(id, title, tasks//array of objects);
  toDoList.saveToStorage();
  //display to the dom
}

function removeTask() {
  //remove added task by clicking x
}

function removeToDoCard() {
  // when x is clicked
  // only if all tasks are checked!!
  //removes todo card from data model deleteFromStorage() todo-list
  //remove todo card from dom
  //display new updated todo
}

function makeToDoUrgent() {
  // when user clicks on urgent button
  // update todo-list urgent
  // update card styling in a dom
}
