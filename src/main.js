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


