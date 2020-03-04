var body = document.querySelector('body');
var searchInput = document.querySelector('.search-input');
var searchBtn = document.querySelector('.search-btn');
var taskContainer = document.querySelector('.task-container');
var titleInput = document.querySelector('.title-input');
var textInput = document.querySelector('.text-input');
var taskBtn = document.querySelector('.task-btn');
var toDoBtn = document.querySelector('.todo-btn');
var clearBtn = document.querySelector('.clear-btn');
var urgentBtn = document.querySelector('.urgent-btn');
var toDoContainer = document.querySelector('.todo-container');
var message = document.querySelector('.message');

window.addEventListener('load', pageLoad);
body.addEventListener('keyup', buttonStatus);
body.addEventListener('click', buttonClick);

function pageLoad() {
  urgentBtn.setAttribute('disabled', 'disabled');
  createToDoArray();
  displayMessage();
  getToDo();
}

function buttonStatus() {
  if (textInput.value !== '') {
    taskBtn.removeAttribute('disabled', 'disabled');
  } else {
    taskBtn.setAttribute('disabled', 'disabled');
  }

  if (titleInput.value !== '') {
    toDoBtn.removeAttribute('disabled', 'disabled');
  }

  if (titleInput.value !== '' || textInput.value !== '') {
    clearBtn.removeAttribute('disabled', 'disabled');
  }

  if (searchInput.value !== '') {
    searchBtn.removeAttribute('disabled', 'disabled');
  } else {
    searchBtn.setAttribute('disabled', 'disabled');
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
    clearAll();
    clearBtn.setAttribute('disabled', 'disabled');
    toDoBtn.setAttribute('disabled', 'disabled');
  }

  if (event.target.classList.contains('checkbox-img')) {
    checkTaskData(event);
    checkTaskDom(event);
    checkToDoCompleted(event);
  }

  if (event.target.classList.contains('delete-todo-img')) {
    deleteToDoData(event);
    deleteToDoDom(event);
  }

  if (event.target.classList.contains('urgent-img')) {
    makeToDoUrgentData(event);
    makeToDoUrgentDom(event);
  }

  if (event.target.closest('.urgent-btn') && toDoContainer.innerText !== '') {
    filterByUrgency();
    clearBtn.removeAttribute('disabled', 'disabled');
  }
}

function createToDoArray() {
  if (!localStorage.getItem('toDoArray')) {
    localStorage.setItem('toDoArray', JSON.stringify([]));
  }
}

function getLocalStorage() {
  var toDoArray = JSON.parse(localStorage.getItem('toDoArray'));
  return toDoArray;
}

function setLocatStorage(toDoArray) {
  localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
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
  getToDo();
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
  if (toDo.tasks.length == 0) {
    toDo.completed = true;
  }
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
    var toDoArray = getLocalStorage();
    for (var i = 0; i < toDoArray.length; i++) {
      var toDo = new ToDo(toDoArray[i].title, toDoArray[i].tasks, toDoArray[i].id, toDoArray[i].urgent, toDoArray[i].completed);
      if (toDoArray[i].completed && !toDoArray[i].urgent) {
        displayCompletedToDo(toDo);
      } else if (toDoArray[i].completed && toDoArray[i].urgent) {
        displayUrgentCompletedToDo(toDo);
      } else if (toDoArray[i].urgent) {
        displayUrgentToDo(toDo);
      } else if (!toDoArray[i].urgent) {
        displayToDo(toDo);
      }
    }
  }
  // urgentBtn.removeAttribute('disabled', 'disabled');
}

function displayToDo(toDo) {
  message.classList.add('hide');
  toDoContainer.insertAdjacentHTML('afterbegin', `
<section class="todo-wrapper" id="todo">
  <p class="task-card-title">${toDo.title}</p>
  <div class="tasks" id="${toDo.id}">
  </div>
  <div class="task-card-footer" id="${toDo.id}">
    <div class="urgent-img-wrapper">
      <img src="img/urgent.svg" alt="urgent" class="urgent-img img">
      <p class="urgent-text">URGENT</p>
    </div>
    <div class="delete-img-wrapper">
      <img src="img/delete.svg" alt="delete" class="img" id="delete">
      <p class="delete-text">DELETE</p>
    </div>
  </div>
</section>
`);
  var task = document.getElementById(`${toDo.id}`);
  for (var i = 0; i < toDo.tasks.length; i++) {
    if (toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo checked" id="${toDo.tasks[i].id}">
    <img src="img/checkbox-active.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }

    if (!toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo" id="${toDo.tasks[i].id}">
    <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }
  }

  urgentBtn.removeAttribute('disabled', 'disabled');
}

function displayUrgentToDo(toDo) {
  message.classList.add('hide');
  toDoContainer.insertAdjacentHTML('afterbegin', `
<section class="todo-wrapper urgent" id="todo">
  <p class="task-card-title">${toDo.title}</p>
  <div class="tasks" id="${toDo.id}">
  </div>
  <div class="task-card-footer" id="${toDo.id}">
    <div class="urgent-img-wrapper">
      <img src="img/urgent-active.svg" alt="urgent" class="urgent-img img">
      <p class="urgent-text">URGENT</p>
    </div>
    <div class="delete-img-wrapper">
      <img src="img/delete.svg" alt="delete" class="img" id="delete">
      <p class="delete-text">DELETE</p>
    </div>
  </div>
</section>
`);
  var task = document.getElementById(`${toDo.id}`);
  for (var i = 0; i < toDo.tasks.length; i++) {
    if (toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo checked" id="${toDo.tasks[i].id}">
    <img src="img/checkbox-active.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }

    if (!toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo" id="${toDo.tasks[i].id}">
    <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }
  }

  urgentBtn.removeAttribute('disabled', 'disabled');
}

function displayCompletedToDo(toDo) {
  message.classList.add('hide');
  toDoContainer.insertAdjacentHTML('afterbegin', `
<section class="todo-wrapper" id="todo">
  <p class="task-card-title">${toDo.title}</p>
  <div class="tasks" id="${toDo.id}">
  </div>
  <div class="task-card-footer" id="${toDo.id}">
    <div class="urgent-img-wrapper">
      <img src="img/urgent.svg" alt="urgent" class="urgent-img img">
      <p class="urgent-text">URGENT</p>
    </div>
    <div class="delete-img-wrapper">
      <img src="img/delete-active.svg" alt="delete" class="delete-todo-img img" id="delete">
      <p class="delete-text">DELETE</p>
    </div>
  </div>
</section>
`);
  var task = document.getElementById(`${toDo.id}`);
  for (var i = 0; i < toDo.tasks.length; i++) {
    if (toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo checked" id="${toDo.tasks[i].id}">
    <img src="img/checkbox-active.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }

    if (!toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo" id="${toDo.tasks[i].id}">
    <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }
  }

  urgentBtn.removeAttribute('disabled', 'disabled');
}

function displayUrgentCompletedToDo(toDo) {
  message.classList.add('hide');
  toDoContainer.insertAdjacentHTML('afterbegin', `
<section class="todo-wrapper urgent" id="todo">
  <p class="task-card-title">${toDo.title}</p>
  <div class="tasks" id="${toDo.id}">
  </div>
  <div class="task-card-footer" id="${toDo.id}">
    <div class="urgent-img-wrapper">
      <img src="img/urgent-active.svg" alt="urgent" class="urgent-img img">
      <p class="urgent-text">URGENT</p>
    </div>
    <div class="delete-img-wrapper">
      <img src="img/delete-active.svg" alt="delete" class="delete-todo-img img" id="delete">
      <p class="delete-text">DELETE</p>
    </div>
  </div>
</section>
`);
  var task = document.getElementById(`${toDo.id}`);
  for (var i = 0; i < toDo.tasks.length; i++) {
    if (toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo checked" id="${toDo.tasks[i].id}">
    <img src="img/checkbox-active.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }

    if (!toDo.tasks[i].checked) {
      task.innerHTML += `
  <div class="task-todo" id="${toDo.tasks[i].id}">
    <img src="img/checkbox.svg" alt="checkbox" class="checkbox-img img">
    <p>${toDo.tasks[i].title}</p>
  </div>
  `;
    }
  }

  urgentBtn.removeAttribute('disabled', 'disabled');
}

function checkTaskData(event) {
  var clickId = event.target.closest('div').id;
  var toDoId = event.target.closest('.tasks').id;
  var toDoArray = getLocalStorage();
  for (var i = 0; i < toDoArray.length; i++) {
    if (toDoArray[i].id == toDoId) {
      var toDoUpdate = toDoArray[i];
      var toDoUpdateId = toDoArray.indexOf(toDoUpdate);
      var taskUpdate = toDoUpdate.tasks.find(taskUpdate => taskUpdate.id == clickId);
      taskUpdate.checked = !taskUpdate.checked;
    }

    setLocatStorage(toDoArray);
  }
}

function checkTaskDom(event) {
  if (!event.target.closest('div').classList.contains('checked')) {
    event.target.closest('div').classList.add('checked');
    event.target.setAttribute('src', 'img/checkbox-active.svg');
  } else if (event.target.closest('div').classList.contains('checked')) {
    event.target.closest('div').classList.remove('checked');
    event.target.setAttribute('src', 'img/checkbox.svg');
  }
}

function checkToDoCompleted(event) {
  var toDoId = event.target.closest('.tasks').id;
  var toDoArray = getLocalStorage();
  var toDo = toDoArray.find(toDo => toDo.id == toDoId);
  var tasks = toDo.tasks;
  var checkCounter = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].checked) {
      checkCounter++;
    }
  }

  if (checkCounter == tasks.length) {
    toDo.completed = true;
    event.target.closest('#todo').querySelector('#delete').classList.add('delete-todo-img');
    event.target.closest('#todo').querySelector('#delete').setAttribute('src', 'img/delete-active.svg');
  } else {
    toDo.completed = false;
    event.target.closest('#todo').querySelector('#delete').classList.remove('delete-todo-img');
    event.target.closest('#todo').querySelector('#delete').setAttribute('src', 'img/delete.svg');
  }

  setLocatStorage(toDoArray);
}

function deleteToDoData(event) {
  var deleteId = event.target.closest('.task-card-footer').id;
  var toDoArray = getLocalStorage();
  var toDoToDelete = toDoArray.find(toDoToDelete => toDoToDelete.id == deleteId);
  var removeToDoIndex = toDoArray.indexOf(toDoToDelete);
  toDoArray.splice(removeToDoIndex, 1);
  setLocatStorage(toDoArray);
}

function deleteToDoDom(event) {
  event.target.closest('section').remove();
  displayMessage();
  if (toDoContainer.innerText == '') {
    urgentBtn.setAttribute('disabled', 'disabled');
  }
}

function makeToDoUrgentData(event) {
  var urgentId = event.target.closest('.task-card-footer').id;
  var toDoArray = getLocalStorage();
  var toDo = toDoArray.find(toDo => toDo.id == urgentId);
  toDo.urgent = !toDo.urgent;
  setLocatStorage(toDoArray);
}

function makeToDoUrgentDom(event) {
  if (!event.target.closest('section').classList.contains('urgent')) {
    event.target.closest('section').classList.add('urgent');
    event.target.setAttribute('src', 'img/urgent-active.svg');
  } else if (event.target.closest('section').classList.contains('urgent')) {
    event.target.closest('section').classList.remove('urgent');
    event.target.setAttribute('src', 'img/urgent.svg');
  }
}

function filterByUrgency() {
  toDoContainer.innerText = '';
  var toDoArray = getLocalStorage();
  for (var i = 0; i < toDoArray.length; i++) {
    if (toDoArray[i].urgent == true) {
      if (toDoArray[i].completed) {
        displayUrgentCompletedToDo(toDoArray[i]);
      }

      if (!toDoArray[i].completed) {
        displayUrgentToDo(toDoArray[i]);
      }
    }
  }
  displayMessage();
  urgentBtn.setAttribute('disabled', 'disabled');
}
