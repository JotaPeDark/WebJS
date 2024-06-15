const API_URL = 'http://localhost:3000/tasks';
const useLocalStorage = false;
let selectedTaskId = null;

async function addTask(event) {
    event.preventDefault();
    const form = document.querySelector('#taskForm');
    const formData = new FormData(form);

    const task = {
        title: formData.get('title'),
        description: formData.get('description'),
    };

    if (useLocalStorage) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        task.id = new Date().getTime();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        form.reset();
        loadTasks();
    } else {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            form.reset();
            loadTasks();
        }
    }
}

function openEditDialog(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    selectedTaskId = tasks.find(task => task.id === taskId);

    const dialog = document.querySelector('dialog');
    const editTitle = document.querySelector('#editTaskForm #editTitle');
    const editDescription = document.querySelector('#editTaskForm #editDescription');

    editTitle.value = selectedTaskId.title;
    editDescription.value = selectedTaskId.description;

    dialog.showModal();
}

function closeDialog() {
    const dialog = document.querySelector('dialog');
    dialog.close();
}

async function editTask(event) {
    event.preventDefault();

    const formData = new FormData(document.querySelector('#editTaskForm'));

    const updatedTask = {
        title: formData.get('title'),
        description: formData.get('description'),
    };

    if (useLocalStorage) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id === selectedTaskId.id);
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        closeDialog();
        loadTasks();
    } else {
        const response = await fetch(`${API_URL}/${selectedTaskId.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });

        if (response.ok) {
            closeDialog();
            loadTasks();
        }
    }
}

async function deleteTask(taskId) {
    if (useLocalStorage) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    } else {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            loadTasks();
        }
    }
}

function filterTasks(event) {
    const filterText = event.target.value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filterText));

    renderTasks(filteredTasks);
}

function renderTasks(tasks) {
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = tasks.map(task => `
        <li id='id-${task.id}'>
            <div>
                <h2>${task.title}</h2>
                <p>${task.description}</p>
            </div>
            <button title="Editar tarefa" onclick="openEditDialog(${task.id})">✏️</button>
            <button class="delete" title="Excluir tarefa" onclick="deleteTask(${task.id})">❌</button>
        </li>
    `).join('');
}

async function loadTasks() {
    if (useLocalStorage) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        renderTasks(tasks);
    } else {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(tasks);
    }
}

window.addEventListener('DOMContentLoaded', loadTasks);
