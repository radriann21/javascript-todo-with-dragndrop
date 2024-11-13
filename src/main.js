const addTaskButton = document.getElementById('add-task')
const listTasks = document.getElementById('list-task')
const formModal = document.getElementById('modal')
const closeModalButton = document.getElementById('close-modal')

// open/close modal
addTaskButton.addEventListener('click', () => {
  formModal.classList.remove('hidden')
})

closeModalButton.addEventListener('click', () => {
  formModal.classList.add('hidden')
})

function initializeTasks() {
  const localStorageTasks = JSON.parse(localStorage.getItem('tasks'))
  let tasks = []

  try {
    tasks = localStorageTasks || []
  } catch (error) {
    console.log(error)
  }

  if (tasks.length === 0) {
    tasks.push({
      id: 1,
      name: 'Delete or edit this task',
      completed: false
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
}
initializeTasks()

