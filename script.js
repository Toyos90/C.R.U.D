// para añadir una tarea a la lista
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");
    let task = {
        text: taskInput.value,
        state: "ToDo"
    };
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    // Actualizar la lista de tareas en la página
    loadTasks();

    // Limpiar el campo de entrada
    taskInput.value = "";
}

// Func. para cambiar el estado de una tarea
function changeState(index) {
  let tasks = getTasks();
  let task = tasks[index];
    if (task.state == 'ToDo') {
      task.state = 'Done';
    } else {
      task.state = 'ToDo';
    }
    saveTasks(tasks);
    loadTasks();
}

// Función para editar una tarea
function editTask(index) {
  let tasks = getTasks();
  let task = tasks[index];
  let newTaskText = prompt('Editar tarea:', task.text);
  if (newTaskText) {
      task.text = newTaskText;
      saveTasks(tasks);
      loadTasks();
  }
}

// func. eliminar una tarea
function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

// Func. para guardar las tareas en el almacenamiento local
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// func. para obtener las tareas desde el almacenamiento local
function getTasks() {
  let tasks = localStorage.getItem('tasks');
  if (tasks) {
      return JSON.parse(tasks);
  } else {
      return [];
  }
}
function loadTasks() {
      let taskList = document.getElementById('taskList');
      let tasks = getTasks();
        taskList.innerHTML = '';
        for (let i=0; i<tasks.length; i++) {
      let task = tasks[i];
      let li = document.createElement('li');
      li.innerHTML = task.text + ' - ' + task.state;

      // botón para cambiar el estado de la tarea
          let stateButton = document.createElement('button');
          stateButton.innerHTML = 'Cambiar Estado';
          stateButton.setAttribute('onclick', 'changeState('+i+')');
          li.appendChild(stateButton);

      // botón para editar la tarea
      let editButton = document.createElement('button');
          editButton.innerHTML = 'Editar';
          editButton.setAttribute('onclick', 'editTask('+i+')');
          li.appendChild(editButton);

      // boton para elminar una tarea
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Eliminar';
      deleteButton.setAttribute('onclick', 'deleteTask('+i+')');
      li.appendChild(deleteButton);
      taskList.appendChild(li);


  }
}