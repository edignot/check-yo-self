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
var createTaskMessage = document.querySelector('.create-new-task-message');
var tasksArray = [];

window.addEventListener('load', pageLoadDisplay);
body.addEventListener('click', buttonClickHandler);
newTaskContainer.addEventListener('click', removeNewTask);
taskCardsContainer.addEventListener('click', toDoClickHandler);

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
    clearAllData();
  }

  if (event.target.closest('.filter-urgency-btn')) {
    alert('filter by urgency');
  }
}

function toDoClickHandler() {
  if (event.target.classList.contains('checkbox-img')) {
    checkTaskDom(event);
  }

  if (event.target.classList.contains('delete-img')) {
    deleteTaskDom(event);
  }
}

function displayMessage() {
  if (!localStorage.getItem('toDoArray') || localStorage.getItem('toDoArray') == []) {
    createTaskMessage.classList.remove('hide');
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
  } else {
    alert('Add New Task');
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

function clearAllData() {
  taskCardsContainer.innerText = '';

  // toDo.deleteFromStorage();
  localStorage.removeItem('toDoArray');
  displayMessage();
}

function createToDoList() {
  if (taskTitleInput.value !== '' && tasksArray.length > 0) {
    createTasksArray();
    saveToDoList();
    displayToDoList();
    clearAllInputs();
  } else if (taskTitleInput.value === '') {
    alert('Add Title');
  } else if (tasksArray.length === 0) {
    alert('Add Task Item');
  }
}

function createTasksArray() {
  if (!localStorage.getItem('toDoArray')) {
    localStorage.setItem('toDoArray', JSON.stringify([]));
  }
}

function saveToDoList() {
  var id = Date.now();
  var title = taskTitleInput.value;
  var tasks = tasksArray;
  var toDo = new ToDoList(id, title, tasks);
  toDo.saveToStorage(toDo);
}

function displayToDoList() {
  createTaskMessage.classList.add('hide');
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
      <img src="img/checkbox-active.svg" alt="checkbox" class="checkbox-img img hide" id="${tasksArray[i].id}">
      <p>${tasksArray[i].text}</p>
    </div>
    `;
  }

  clearAllInputs();
}

function checkTaskDom(event) {
  event.target.closest('div').classList.add('checked-text');
  event.target.classList.add('hide');
  event.target.nextSibling.classList.remove('hide');
}

function deleteTaskDom(event) {
  event.target.closest('.task-card-container').remove();
}




// <div class="task-card-container task-card-container-urgent">
//   <p class="task-card-title task-card-title-urgent">Task Title</p>
//   <div class="task-list-wrapper task-list-wrapper-urgent">
//     <div class="task-list-item">
//       <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
//       <p>Your task here!</p>
//     </div>
//     <div class="task-list-item">
//       <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
//       <p>Your task here!</p>
//     </div>
//   </div>
//   <div class="task-card-footer task-list-footer-urgent">
//     <div class="urgent-img-wrapper">
//       <img src="img/urgent.svg" alt="urgent" class="urgent-img img hide">
//       <img src="img/urgent-active.svg" alt="urgent active" class="urgent-active-img img">
//       <p class="urgent-active-text">URGENT</p>
//     </div>
//     <div class="delete-img-wrapper">
//       <img src="img/delete.svg" alt="delete" class="delete-img img">
//       <p class="delete-text">DELETE</p>
//     </div>
//   </div>
// </div>
