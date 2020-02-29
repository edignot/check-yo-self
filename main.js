var body = document.querySelector('body');
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
var newTaskContainer = document.querySelector('.new-task-container');
var taskTitleInput = document.querySelector('.task-title-input');
var taskItemInput = document.querySelector('.task-item-input');
var addTaskBtn = document.querySelector('.add-task-btn');
var makeTaskListBtn = document.querySelector('.make-task-list-btn');
var clearAllBtn = document.querySelector('.clear-all-btn btn');
var filterUrgencyBtn = document.querySelector('.filter-urgency-btn');
var taskCardsContainer = document.querySelector('.task-cards-container');
var tasksArray = [];

// window.onload = displayAllToDo();
body.addEventListener('click', clickHandler);
newTaskContainer.addEventListener('click', removeNewTask);

function clickHandler(event) {
  if (event.target.closest('.add-task-btn')) {
    createTaskInstance();
  }
  if (event.target.closest('.search-btn')) {
    alert('search');
  }
  if (event.target.closest('.make-task-list-btn')) {
    createToDoList();
  }
  if (event.target.closest('.clear-all-btn')) {
    clearAllInputs();
  }
  if (event.target.closest('.filter-urgency-btn')) {
    alert('filter by urgency');
  }
}

function createTaskInstance() {
  if (taskItemInput.value !== '') {
    var task = {
      text: taskItemInput.value,
      id: Date.now(),
      checked: false,
    };
    saveTaskInstance(task);
    displayNewTask(task);
  }
}

function displayNewTask(task) {
  if (taskItemInput.value !== '') {
    var taskItemId = task.id;
    var taskItem = getTaskInputValue();
    newTaskContainer.insertAdjacentHTML('beforeend', `
  <div class="task-list-item new-list-item" id="${taskItemId}">
    <img src="img/delete.svg" alt="checkbox" class="checkbox-img img" id="${taskItemId}">
    <p>${taskItem}</p>
  </div>
  <div class="task-list-item">
  `);
    taskItemInput.value = '';
  }
}

function getTaskInputValue() {
  return taskItemInput.value;
}

function saveTaskInstance(task) {
  tasksArray.push(task);
}

function removeNewTask(event) {
  if (event.target.classList.contains('checkbox-img')) {
    var clickedId = event.target.id;
    var obj = tasksArray.find(obj => obj.id == clickedId);
    var removeId =  tasksArray.indexOf(obj);
    tasksArray.splice(removeId, 1);
    event.target.closest('div').remove();
  }
}

function clearAllInputs() {
  taskTitleInput.value = '';
  taskItemInput.value = '';
  newTaskContainer.innerText = '';
  var tasksArray = [];
}

function createToDoList() {
  if (taskTitleInput.value !== '' && tasksArray.length > 0) {
    displayToDoList();
    // saveToDoList();
    clearAllInputs();
  } else if (taskTitleInput.value === '') {
    alert('Add Title');
  } else if (tasksArray.length === 0) {
    alert('Add Task Item');
  }
}

function displayToDoList() {
  var titleItem = getTitleInputValue();
  taskCardsContainer.insertAdjacentHTML('beforeend', `
<div class="task-card-container">
  <p class="task-card-title">${titleItem}</p>
  <div class="task-list-wrapper">
    <div class="task-list-item">
      <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
      <p>${tasksArray}</p>
    </div>
  </div>
  <div class="task-card-footer">
    <div class="urgent-img-wrapper">
      <img src="img/urgent.svg" alt="urgent" class="urgent-img img">
      <p class="urgent-text">URGENT</p>
    </div>
    <div class="delete-img-wrapper">
      <img src="img/delete.svg" alt="delete" class="delete-img img">
      <p class="delete-text">DELETE</p>
    </div>
  </div>
</div>
`);
}

function getTitleInputValue() {
  return taskTitleInput.value;
}


// function saveToDoList() {
//   // create id counter++
//   // get Title queryselector
//   // get tasks queryselector array of strings
//   // loop through array of tasks and creating new instances of a task
//
//
//   var toDoList = new ToDoList(id, title, tasks) //array of objects);
//   toDoList.saveToStorage();
//   //display to the dom
// }
//
