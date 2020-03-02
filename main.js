var body = document.querySelector('body');
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
var newTaskContainer = document.querySelector('.new-task-container');
var taskTitleInput = document.querySelector('.task-title-input');
var taskItemInput = document.querySelector('.task-item-input');
var addTaskBtn = document.querySelector('.add-task-btn');
var makeTaskListBtn = document.querySelector('.make-task-list-btn');
var clearAllBtn = document.querySelector('.clear-all-btn');
var filterUrgencyBtn = document.querySelector('.filter-urgency-btn');
var taskCardsContainer = document.querySelector('.task-cards-container');
var createTaskMessage = document.querySelector('.create-new-task-message');
var toDoList = new ToDoList();

window.addEventListener('load', pageLoadDisplay);
body.addEventListener('input', buttonStatusHandler);
body.addEventListener('click', buttonClickHandler);

function pageLoadDisplay() {
  // displayToDoList();
  displayMessage();
}

function displayMessage() {
  if (taskCardsContainer.innerText === '') {
    createTaskMessage.classList.remove('hide');
  }
}

function buttonStatusHandler() {
  if (taskItemInput.value !== '') {
    addTaskBtn.removeAttribute('disabled', 'disabled');
  }

  if (taskTitleInput.value !== '') {
    makeTaskListBtn.removeAttribute('disabled', 'disabled');
  }

  if (taskTitleInput.value !== '' || taskItemInput.value !== '') {
    clearAllBtn.removeAttribute('disabled', 'disabled');
  }

  if (searchInput.value !== '') {
    searchBtn.removeAttribute('disabled', 'disabled');
  }
}

function buttonClickHandler(event) {
  if (event.target.closest('.search-btn')) {
    alert('search');
  }

  if (event.target.classList.contains('add-task-btn')) {
    createTaskInstance();
    addTaskBtn.setAttribute('disabled', 'disabled');
  }

  if (event.target.closest('.make-task-list-btn')) {
    toDoList.updateTitle();
    saveToDoList();
    displayToDoList();
    makeTaskListBtn.setAttribute('disabled', 'disabled');
  }

  if (event.target.closest('.clear-all-btn')) {
    clearAllInputs();
    clearAllBtn.setAttribute('disabled', 'disabled');
    makeTaskListBtn.setAttribute('disabled', 'disabled');
  }

  if (event.target.closest('.filter-urgency-btn')) {
    alert('filter by urgency');
  }

  if (event.target.classList.contains('delete-img')) {
    removeTaskDisplay(event);
  }

  if (event.target.classList.contains('checkbox-img')) {
    // checkTaskData(event);
    checkTaskDom(event);
  }

  if (event.target.classList.contains('delete-todo-img')) {
    // removeToDoData(event);
    removeToDoDom(event);
  }

  if (event.target.classList.contains('urgent-img')) {
    // makeToDoUrgentData(event);
    makeToDoUrgentDom(event);
  }
}

function clearAllInputs() {
  taskTitleInput.value = '';
  taskItemInput.value = '';
  newTaskContainer.innerText = '';
  toDoList.tasks = [];
  buttonStatusHandler();
}

function createTaskInstance() {
  if (taskItemInput.value !== '') {
    var task = new Task(taskItemInput.value);
  }

  toDoList.updateTaskArray(task);
  displayNewTask(task);
}

function displayNewTask(task) {
  newTaskContainer.insertAdjacentHTML('beforeend', `
  <div class="task-list-item new-list-item" id="${task.id}">
    <img src="img/delete.svg" alt="delete" class="delete-img img" id="${task.id}">
    <p>${task.title}</p>
  </div>
  `);
  taskItemInput.value = '';
}

function removeTaskDisplay(event) {
  if (event.target.classList.contains('delete-img')) {
    var clickedId = event.target.id;
    var removeTask = toDoList.tasks.find(removeTask => removeTask.id == clickedId);
    var removeId = toDoList.tasks.indexOf(removeTask);
    toDoList.tasks.splice(removeId, 1);
    event.target.closest('div').remove();
  }
}

function saveToDoList() {
  createToDoArray();
  toDoList.saveToStorage(toDoList);
}

function createToDoArray() {
  if (!localStorage.getItem('toDoArray')) {
    localStorage.setItem('toDoArray', JSON.stringify([]));
  }
}

function displayToDoList() {
  createTaskMessage.classList.add('hide');
  taskCardsContainer.insertAdjacentHTML('afterbegin', `
<section class="task-card-container">
  <p class="task-card-title">${toDoList.title}</p>
  <div class="task-list-wrapper" id="${toDoList.id}">
  </div>
  <div class="task-card-footer">
    <div class="urgent-img-wrapper">
      <img src="img/urgent.svg" alt="urgent" class="urgent-img img">
      <p class="urgent-text">URGENT</p>
    </div>
    <div class="delete-img-wrapper">
      <img src="img/delete.svg" alt="delete" class="delete-todo-img img">
      <p class="delete-text">DELETE</p>
    </div>
  </div>
</section>
`);
  var taskItem = document.getElementById(`${toDoList.id}`);
  for (var i = 0; i < toDoList.tasks.length; i++) {
    taskItem.innerHTML += `
  <div class="task-list-item" id="${toDoList.tasks[i].id}">
    <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDoList.tasks[i].title}</p>
  </div>
  `;
  }

  clearAllInputs();
  toDoList = new ToDoList();
}

// function checkTaskData(event) {
//   debugger;
//   var clickedId = event.target.closest('div').id;
//   var toDoId = event.target.closest('.task-list-wrapper').id;
//   var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
//   for (var i = 0; i < toDoArray.length; i++) {
//     if (toDoArray[i].id == toDoId) {
//       for (var i = 0; i < toDoArray[i].tasks.length; i++) {
//         if (toDoArray[i].tasks[i].id == clickedId) {
//           toDoArray[i].tasks[i].checked = true;
//         }
//       }
//     }
//   }
// }

function checkTaskDom(event) {
  if (!event.target.closest('div').classList.contains('checked-text')) {
    event.target.closest('div').classList.add('checked-text');
    event.target.setAttribute('src', 'img/checkbox-active.svg');
  } else if (event.target.closest('div').classList.contains('checked-text')) {
    event.target.closest('div').classList.remove('checked-text');
    event.target.setAttribute('src', 'img/checkbox.svg');
  }
}

// function removeToDoData(event) {
//
// }

function removeToDoDom(event) {
  event.target.closest('section').remove();
  displayMessage();
}

// function makeToDoUrgentData(event) {
//
// }

function makeToDoUrgentDom(event) {
  if (!event.target.closest('section').classList.contains('task-card-container-urgent')) {
    event.target.closest('section').classList.add('task-card-container-urgent');
    event.target.setAttribute('src', 'img/urgent-active.svg');
    event.target.closest('.task-card-footer').classList.add('task-list-footer-urgent');
  } else if (event.target.closest('section').classList.contains('task-card-container-urgent')) {
    event.target.closest('section').classList.remove('task-card-container-urgent');
    event.target.setAttribute('src', 'img/urgent.svg');
    event.target.closest('.task-card-footer').classList.remove('task-list-footer-urgent');
  }
}
