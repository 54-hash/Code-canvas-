document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Add task event
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = createTaskElement(taskText, false);
        taskList.appendChild(taskItem);
        saveTasks();
        taskInput.value = '';
        // Add animation class
        taskItem.style.animation = 'slideIn 0.3s ease';
    }

    function createTaskElement(text, completed) {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', () => toggleComplete(li));

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.addEventListener('click', () => deleteTask(li));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    function toggleComplete(li) {
        li.classList.toggle('completed');
        saveTasks();
    }

    function deleteTask(li) {
        li.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            taskList.removeChild(li);
            saveTasks();
        }, 300);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
    }
});
