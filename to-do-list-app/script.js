let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
    taskText.textContent = task.text;
    taskText.onclick = () => toggleComplete(index);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => inlineEditTask(index, li);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (text === '') {
    alert('Task cannot be empty!');
    return;
  }
  tasks.push({ text, completed: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function inlineEditTask(index, li) {
  const task = tasks[index];

  const input = document.createElement('input');
  input.type = 'text';
  input.value = task.text;
  input.className = 'edit-input';
  input.style.flex = '1';
  input.style.padding = '6px';
  input.style.fontSize = '16px';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.onclick = () => {
    const newText = input.value.trim();
    if (newText === '') {
      alert('Task cannot be empty!');
      return;
    }
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  };

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveBtn.click();
    }
  });

  li.innerHTML = '';
  li.appendChild(input);
  li.appendChild(saveBtn);
}

window.onload = renderTasks;
