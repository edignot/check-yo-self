var body = document.querySelector('body');
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
var taskContainer = document.querySelector('.task-container');
var titleInput = document.querySelector('.title-input');
var textInput = document.querySelector('.text-input');
var taskBtn = document.querySelector('.task-btn');
var toDoBtn = document.querySelector('.todo-btn');
var clearBtn = document.querySelector('.clear-btn');
var urgentbtn = document.querySelector('.urgent-btn');
var toDoContainer = document.querySelector('.todo-container');
var message = document.querySelector('.message');

window.addEventListener('load', pageLoad);
body.addEventListener('input', buttonStatus);
body.addEventListener('click', buttonClick);

function pageLoad() {
  createToDoArray();
  displayMessage();
  getToDo();
}

function buttonStatus() {
  if (textInput.value !== '') {
    taskBtn.removeAttribute('disabled', 'disabled');
  }

  if (titleInput.value !== '') {
    toDoBtn.removeAttribute('disabled', 'disabled');
  }

  if (titleInput.value !== '' || textInput.value !== '') {
    clearBtn.removeAttribute('disabled', 'disabled');
  }

  if (searchInput.value !== '') {
    searchBtn.removeAttribute('disabled', 'disabled');
  }
}

function buttonClick(event) {
  if (event.target.classList.contains('task-btn')) {
    displayTask();
    taskBtn.setAttribute('disabled', 'disabled');
  }

  if (event.target.classList.contains('delete-img')) {
    removeTask(event);
  }

  if (event.target.closest('.clear-btn')) {
    clearAll();
    clearBtn.setAttribute('disabled', 'disabled');
    toDoBtn.setAttribute('disabled', 'disabled');
  }

  if (event.target.closest('.todo-btn')) {
    saveToDo();
    getToDo();
    toDoBtn.setAttribute('disabled', 'disabled');
  }

  if (event.target.classList.contains('checkbox-img')) {
    // checkTaskData(event);
    checkTaskDom(event);
  }

  if (event.target.classList.contains('delete-todo-img')) {
    deleteToDoData(event);
    deleteToDoDom(event);
  }

  if (event.target.classList.contains('urgent-img')) {
    makeToDoUrgentData(event);
    makeToDoUrgentDom(event);
  }

  if (event.target.closest('.urgent-btn')) {
    alert('filter by urgency');
  }
}

function createToDoArray() {
  if (!localStorage.getItem('toDoArray')) {
    localStorage.setItem('toDoArray', JSON.stringify([]));
  }
}

function displayMessage() {
  if (toDoContainer.innerText === '') {
    message.classList.remove('hide');
  }
}

function displayTask() {
  var taskId = Date.now();
  var taskText = textInput.value;
  taskContainer.insertAdjacentHTML('beforeend', `
  <div class="task" id="${taskId}">
    <img src="img/delete.svg" alt="delete" class="delete-img img" id="${taskId}">
    <p>${taskText}</p>
  </div>
  `);
  textInput.value = '';
}

function removeTask(event) {
  if (event.target.classList.contains('delete-img')) {
    event.target.closest('div').remove();
  }
}

function clearAll() {
  titleInput.value = '';
  textInput.value = '';
  taskContainer.innerText = '';
}

function saveToDo() {
  var tasks = [];
  var allTasks = taskContainer.querySelectorAll('div.task');
  allTasks.forEach(task => tasks.push(createTask(task)));
  var title = titleInput.value;
  var toDo = new ToDo(title, tasks);
  toDo.saveToStorage(toDo);
}

function createTask(task) {
  var title = task.innerText;
  var id = task.id;
  return new Task(title, id);
}

function getToDo() {
  toDoContainer.innerText = '';
  if (localStorage.getItem('toDoArray')) {
    var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
    for (var i = 0; i < toDoArray.length; i++) {
      var toDo = new ToDo(toDoArray[i].title, toDoArray[i].tasks, toDoArray[i].id, toDoArray[i].urgent);
      displayToDo(toDo);
    }
  }
}

function displayToDo(toDo) {
  message.classList.add('hide');
  toDoContainer.insertAdjacentHTML('afterbegin', `
<section class="todo-wrapper">
  <p class="task-card-title">${toDo.title}</p>
  <div class="tasks" id="${toDo.id}">
  </div>
  <div class="task-card-footer" id="${toDo.id}">
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
  var task = document.getElementById(`${toDo.id}`);
  for (var i = 0; i < toDo.tasks.length; i++) {
    task.innerHTML += `
  <div class="task-todo" id="${toDo.tasks[i].id}">
    <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
  }

  clearAll();
}

// function checkTaskData(event) {
//   // var clickId = event.target.closest('div').id;
//   // var toDoId = event.target.closest('.tasks').id;
//   // toDo.updateTask(clickId, toDoId);
// }

function checkTaskDom(event) {
  if (!event.target.closest('div').classList.contains('checked')) {
    event.target.closest('div').classList.add('checked');
    event.target.setAttribute('src', 'img/checkbox-active.svg');
  } else if (event.target.closest('div').classList.contains('checked')) {
    event.target.closest('div').classList.remove('checked');
    event.target.setAttribute('src', 'img/checkbox.svg');
  }
}

function deleteToDoData(event) {
  var deleteId = event.target.closest('.task-card-footer').id;
  var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
  var toDoToDelete = toDoArray.find(toDoToDelete => toDoToDelete.id == deleteId);
  var removeToDoIndex = toDoArray.indexOf(toDoToDelete);
  toDoArray.splice(removeToDoIndex, 1);
  localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
}

function deleteToDoDom(event) {
  event.target.closest('section').remove();
  displayMessage();
}

function makeToDoUrgentData(event) {
  debugger;
  var urgentId = event.target.closest('.task-card-footer').id;
  var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
  var toDo = toDoArray.find(toDo => toDo.id == urgentId);
  toDo.urgent = !toDo.urgent;
  localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
}

function makeToDoUrgentDom(event) {
  if (!event.target.closest('section').classList.contains('urgent')) {
    event.target.closest('section').classList.add('urgent');
    event.target.setAttribute('src', 'img/urgent-active.svg');
    event.target.closest('.task-card-footer').classList.add('footer-urgent');
  } else if (event.target.closest('section').classList.contains('urgent')) {
    event.target.closest('section').classList.remove('urgent');
    event.target.setAttribute('src', 'img/urgent.svg');
    event.target.closest('.task-card-footer').classList.remove('footer-urgent');
  }
}
