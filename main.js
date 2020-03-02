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
newTaskContainer.addEventListener('click', removeTaskDisplay);
taskCardsContainer.addEventListener('click', toDoClickHandler);

function pageLoadDisplay() {
  // displayToDoList();
  displayMessage();
}

function displayMessage() {
  // if no todo to display, then display message
  createTaskMessage.classList.remove('hide');
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
}

function toDoClickHandler() {
  if (event.target.classList.contains('delete-img')) {
    removeTaskDisplay(event);
  }

  // if (event.target.classList.contains('checkbox-img')) {
  //   checkTaskDom(event);
  // }
}

function clearAllInputs() {
  taskTitleInput.value = '';
  taskItemInput.value = '';
  newTaskContainer.innerText = '';
  toDoList.tasks = [];
  buttonStatusHandler();
}

function createTaskInstance() {
  debugger;
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

function displayToDoList() {
  createTaskMessage.classList.add('hide');
  taskCardsContainer.insertAdjacentHTML('beforeend', `
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
      <img src="img/delete.svg" alt="delete" class="delete-img img">
      <p class="delete-text">DELETE</p>
    </div>
  </div>
</section>
`);
  var taskItem = document.getElementById(`${toDoList.id}`);
  for (var i = 0; i < toDoList.tasks.length; i++) {
    taskItem.innerHTML += `
  <div class="task-list-item">
    <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDoList.tasks[i].title}</p>
  </div>
  `;
  }
  clearAllInputs();
  toDoList = new ToDoList();
}











// function checkTaskDom(event) {
//   event.target.closest('div').classList.add('checked-text');
//   event.target.classList.add('hide');
//   event.target.nextSibling.classList.remove('hide');
// }
//
// function deleteTaskDom(event) {
//   event.target.closest('.task-card-container').remove();
// }


// function createToDoList() {
//   if (taskTitleInput.value !== '' && tasksArray.length > 0) {
//     createTasksArray();
//     // saveToDoList();
//     displayToDoList();
//     clearAllInputs();
//   } else if (taskTitleInput.value === '') {
//     alert('Add Title');
//   } else if (tasksArray.length === 0) {
//     alert('Add Task Item');
//   }
// }
//
// function createTasksArray() {
//   if (!localStorage.getItem('toDoArray')) {
//     localStorage.setItem('toDoArray', JSON.stringify([]));
//   }
// }

// function saveToDoList() {
//   var id = Date.now();
//   var title = taskTitleInput.value;
//   var tasks = tasksArray;
//   var toDo = new ToDoList(id, title, tasks);
//   toDo.saveToStorage(toDo);
// }


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
