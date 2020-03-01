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
var taskDisplayContainer = document.querySelector('.task-display-container');
var tasksArray = [];

window.addEventListener('load', pageLoadDisplay);
body.addEventListener('click', buttonClickHandler);
newTaskContainer.addEventListener('click', removeNewTask);

function pageLoadDisplay() {
  // displayToDoList();
  displayMessage();
}

function buttonClickHandler(event) {
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

function displayMessage() {
  // add condition if there are no other notes to display
  taskDisplayContainer.insertAdjacentHTML('afterbegin', `
    <p class="create-new-task-message">Nothing to Display.</br> Create New Task!</p>
  `);
}

////////////////////////////////////////////////////////////////////////////////////
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

function saveTaskInstance(task) {
  tasksArray.push(task);
}

function displayNewTask(task) {
  if (taskItemInput.value !== '') {
    var taskItemId = task.id;
    var taskItem = taskItemInput.value;
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

function removeNewTask(event) {
  if (event.target.classList.contains('checkbox-img')) {
    var clickedId = event.target.id;
    var obj = tasksArray.find(obj => obj.id == clickedId);
    var removeId = tasksArray.indexOf(obj);
    tasksArray.splice(removeId, 1);
    event.target.closest('div').remove();
  }
}

function clearAllInputs() {
  taskTitleInput.value = '';
  taskItemInput.value = '';
  newTaskContainer.innerText = '';
  tasksArray = [];
}
////////////////////////////////////////////////////////////////////////////////////
function createToDoList() {
  if (taskTitleInput.value !== '' && tasksArray.length > 0) {
    saveToDoList();
    displayToDoList();
    clearAllInputs();
  } else if (taskTitleInput.value === '') {
    alert('Add Title');
  } else if (tasksArray.length === 0) {
    alert('Add Task Item');
  }
}

function saveToDoList() {
  debugger;
  var id = Date.now();
  var title = taskTitleInput.value;
  var tasks = tasksArray;
  var toDo = new ToDoList(id, title, tasks);
  toDo.saveToStorage(toDo);
}

function displayToDoList() {
  var titleItem = taskTitleInput.value;
  taskCardsContainer.insertAdjacentHTML('beforeend', `
<div class="task-card-container">
  <p class="task-card-title">${titleItem}</p>
  <div class="task-list-wrapper" id="${titleItem}">

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
  var taskItem = document.querySelector(`#${titleItem}`);
  for (var i = 0; i < tasksArray.length; i++) {
    taskItem.innerHTML += `
    <div class="task-list-item" id="${tasksArray[i].id}">
      <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img" id="${tasksArray[i].id}">
      <p>${tasksArray[i].text}</p>
    </div>
    `;
  }
  clearAllInputs();
}
