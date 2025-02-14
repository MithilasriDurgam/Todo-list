
const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = [];

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            id: Date.now(),
            text: taskText
        };

        tasks.push(newTask);
        renderTasks();
        taskInput.value = "";
    }
});

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));
        
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(li);
    });
}

function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    const newText = prompt('Edit task:', task.text);

    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}