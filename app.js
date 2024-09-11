// Obtener elementos del DOM
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Inicializar array de tareas
let tasks = [];

// Cargar tareas desde localStorage si existen
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

function renderTasks() {
    // Limpiar la lista de tareas en el DOM
    taskList.innerHTML = '';

    // Recorrer el array de tareas y agregarlas al DOM
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="complete-btn" data-index="${index}">Completada</button>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `;
        taskList.appendChild(taskItem);
    });

    // Agregar eventos a los botones
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', deleteTask);
    });

    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(btn => {
        btn.addEventListener('click', completeTask);
    });
}


// Agregar tarea
addTaskBtn.addEventListener("click", function() {
    if (taskInput.value === "") {
        alert("Escribe una tarea");
        return;
    }
    const task = {
        text: taskInput.value,
        completed: false
    };

    // Agregar la tarea al array
    tasks.push(task);

    // Guardar en localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Renderizar tareas
    renderTasks();

    // Limpiar el campo de entrada
    taskInput.value = "";
});


// Función para eliminar tarea
function deleteTask(event) {
    const index = event.target.getAttribute('data-index');
    tasks.splice(index, 1);

    // Actualizar localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Renderizar tareas
    renderTasks();
}
function completeTask(event) {
    const index = event.target.getAttribute('data-index');
    tasks[index].completed = !tasks[index].completed;

    // Actualizar localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Renderizar tareas
    renderTasks();
}

