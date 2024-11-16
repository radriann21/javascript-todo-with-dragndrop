const addTaskButton = document.getElementById('add-task')
const listTasks = document.getElementById('list-task')
const formModal = document.getElementById('modal')
const closeModalButton = document.getElementById('close-modal')
const taskForm = document.getElementById('task-form')
let tasks = []
let editingTask = null

// open/close modal
addTaskButton.addEventListener('click', () => {
  formModal.querySelector('#task').value = ''
  formModal.classList.remove('hidden')
  taskForm.focus()
})
closeModalButton.addEventListener('click', (evt) => {
  evt.preventDefault()
  formModal.classList.add('hidden')
  formModal.querySelector('#task').value = ''
})
// open/close modal


// function to delete the task
function deleteTask(evt) {
  const taskId = evt.currentTarget.closest('li').getAttribute('data-id')
  tasks = tasks.filter(task => task.id !== taskId)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  mapTasks(tasks)
}

// function to get the task to edit
function editTask(evt) {
  formModal.classList.remove('hidden')
  taskForm.focus()

  const taskId = evt.currentTarget.closest('li').getAttribute('data-id')
  const task = tasks.find(task => task.id === taskId)
  editingTask = task
  formModal.querySelector('#task').value = task.name
}


// function to create the HTML String element for every task
function renderTask(task) {
  const taskHTML = `
     <li class="flex items-center justify-between" data-id="${task.id}" >
          <div class="flex items-center space-x-2">
            <input class="check-task" type="checkbox" name="completed">
            <p class="inline text-sm text-gray-700">${task.name}</p>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="delete-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-trash-x">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7h16" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              <path d="M10 12l4 4m0 -4l-4 4" />
            </svg>
            <svg class="edit-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-edit">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </div>
        </li>
  `
  return taskHTML
}



// function to map every task and make the render
function mapTasks(tasks) {
  listTasks.innerHTML = ''
  tasks.forEach(task => {
    listTasks.innerHTML += renderTask(task)
  })

  // add delete action 
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', deleteTask)
  })

  // add edit action
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', editTask)
  })

  // add completed action
  document.querySelectorAll('.check-task').forEach(check => {
    check.addEventListener('change', (evt) => {
      if (check.checked) {
        deleteTask(evt)
      }
    })
  })
}



// function to initialize the localStorage and the tasks
function initializeTasks() {
  const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))

  try {
    tasks = localStorageTasks || []
  } catch (error) {
    console.log(error)
  }

  if (tasks.length === 0) {
    tasks.push({
      id: crypto.randomUUID(),
      name: 'Delete or edit this task',
      completed: false
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  mapTasks(tasks)
}
initializeTasks()



// event to add a new task
formModal.addEventListener('submit', (evt) => {
  evt.preventDefault()

  const taskName = formModal.querySelector('#task').value

  if (editingTask !== null) {
    editingTask.name = taskName
    localStorage.setItem('tasks', JSON.stringify(tasks))
    mapTasks(tasks)
    formModal.classList.add('hidden')
    editingTask = null
    return
  } else {
    const task = {
      id: crypto.randomUUID(),
      name: taskName,
      completed: false
    }

    if (task.name === '' || !task.name) {
      return
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    mapTasks(tasks)
    formModal.classList.add('hidden')
  }

  formModal.querySelector('#task').value = ''
})


