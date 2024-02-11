document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearListBtn = document.getElementById('clearListBtn');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            clearListBtn.disabled = false;
        }
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            toggleTaskStatus(e.target.parentElement);
        }
    });

    clearListBtn.addEventListener('click', function() {
        clearTaskList();
        clearListBtn.disabled = true;
    });

    loadTasks();

    function addTask(taskText) {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
        `;
        taskList.appendChild(li);
        saveTasks();
    }

    function toggleTaskStatus(task) {
        task.classList.toggle('completed');
        saveTasks();
    }

    function clearTaskList() {
        taskList.innerHTML = '';
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task').forEach(function(task) {
            tasks.push({
                text: task.querySelector('span').innerText,
                completed: task.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function(task) {
            addTask(task.text);
            const latestTask = taskList.lastElementChild;
            if (task.completed) {
                latestTask.classList.add('completed');
                latestTask.querySelector('input[type="checkbox"]').checked = true;
            }
        });
        clearListBtn.disabled = tasks.length === 0;
    }
});
