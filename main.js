// Global variables
var body = document.querySelector('body');
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
// var taskItemContainer = document.querySelector('.task-item-container');
var newTaskContainer = document.querySelector('.new-task-container');
var taskTitleInput = document.querySelector('.task-title-input');
var taskItemInput = document.querySelector('.task-item-input');
var addTaskBtn = document.querySelector('.add-task-btn');
var makeTaskListBtn = document.querySelector('.make-task-list-btn');
var clearAllBtn = document.querySelector('.clear-all-btn btn');
var filterUrgencyBtn = document.querySelector('.filter-urgency-btn');
var tasksArray = [];

window.onload = displayToDo();
body.addEventListener('click', clickHandler);

function clickHandler(event) {
  if (event.target.closest('.add-task-btn')) {
    createTaskInstance();
    displayNewTask();
  }
  // if (event.target.closest('.search-btn')) {
  //
  // }
  // if (event.target.closest('.make-task-list-btn')) {
  //   //create to do note and display it
  //
  // }
  if (event.target.closest('.clear-all-btn')) {
    clearAllInputs();
  }
  // if (event.target.closest('.filter-urgency-btn')) {
  //
  // }
}

// CREATE TASK ANT DISPLAY ON THE DOM, SAVE
function createTaskInstance() {
  if (taskItemInput.value !== '') {
    var task = {
      text: taskItemInput.value,
      id: Date.now(),
      checked: false,
    };
    saveTaskInstance(task);
  }
}

function displayNewTask() {
  if (taskItemInput.value !== '') {
    var taskItem = getInputValue();
    newTaskContainer.insertAdjacentHTML('beforebegin', `
  <div class="task-list-item new-list-item">
    <img src="img/delete.svg" alt="checkbox" class="checkbox-img img">
    <p>${taskItem}</p>
  </div>
  <div class="task-list-item">
  `);
  } else {
    alert('Add task!');
  }
}

function getInputValue() {
  return taskItemInput.value;
}

function saveTaskInstance(task) {
  tasksArray.push(task);
  console.log(tasksArray);
}

// CLEAR ALL INPUTS
function clearAllInputs() {
  taskTitleInput.value = '';
  taskItemInput.value = '';
  // clean task container
  newTaskContainer.innerHTML = '';
}



























function displayToDo() {
  //display all existing to does from localstorage
  //sort todoes so most recent to does displayed top left
}


function makeList() {
  // create id counter++
  // get Title queryselector
  // get tasks queryselector array of strings
  // loop through array of tasks and creating new instances of a task


  var toDoList = new ToDoList(id, title, tasks) //array of objects);
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
