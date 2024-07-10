document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from localStorage
    loadTasks();
  
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
      }
      else{
        alert('Please Enter Task')
      }
    });
  
    function addTask(text, completed = false) {
      const li = document.createElement('li');
      if (completed) {
        li.classList.add('completed');
      }
  
      const taskSpan = document.createElement('span');
      taskSpan.textContent = text;
      li.appendChild(taskSpan);
  
      const actions = document.createElement('div');
      actions.className = 'task-actions';
  
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.textContent = 'Edit';
      actions.appendChild(editBtn);
  
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      actions.appendChild(deleteBtn);
  
      const completeBtn = document.createElement('button');
      completeBtn.className = 'complete-btn';
      completeBtn.textContent = 'Complete';
      actions.appendChild(completeBtn);
  
      li.appendChild(actions);
      taskList.appendChild(li);
  
      // Save tasks to localStorage
      saveTasks();
  
      editBtn.addEventListener('click', () => {
        const newText = prompt('Edit Task:', taskSpan.textContent);
        if (newText !== null) {
          taskSpan.textContent = newText.trim();
          // Save tasks to localStorage
          saveTasks();
        }
      });
  
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        // Save tasks to localStorage
        saveTasks();
      });
  
      completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        // Save tasks to localStorage
        saveTasks();
      });
    }
  
    function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll('li').forEach((task) => {
        tasks.push({
          text: task.querySelector('span').textContent,
          completed: task.classList.contains('completed')
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task.text, task.completed));
    }
  });
  