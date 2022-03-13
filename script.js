const tasksContainer = document.getElementById('tasks')
const todoInput = document.getElementById('todo-input')

//Достать таски из LS и закинуть в массив
let tasksArray = JSON.parse(localStorage.getItem('tasks')) ?? []

//Создать таски и добавить в DOM
tasksArray?.forEach(({ text, completed }) => {
  createTodo(text, completed)
})

//Обработчик для добавления таски после нажатия клавиши Enter
todoInput.addEventListener('keyup', ({ key, target }) => {
  if (key === 'Enter' && target.value !== '') {
    //Создать элемент и добавить в DOM
    createTodo(target.value)
    //Добавить новую таску в LS
    tasksArray.push({ text: target.value, completed: false })
    target.value = ''
    updateLS()
  }
})

//Создает таск с текстом
function createTodo(text, completed = false) {
  //Создаем новый элемент и добавляем атрибуты
  const newTodo = document.createElement('div')
  newTodo.classList.add('filled')

  //Добавляем текст задачи и устанавливаем стиль в зависимости от статуса
  newTodo.innerText = text
  if (completed) {
    newTodo.classList.add('lineThrough')
  }

  //Добавить обработчики для ЛКМ - пометить как выполненный
  newTodo.addEventListener('click', (e) => {
    e.target.classList.toggle('lineThrough')
    //Исправить значение в LS
    tasksArray.find(
      ({ text, completed }) => text === e.target.innerText
    ).completed = !tasksArray.find(
      ({ text, completed }) => text === e.target.innerText
    ).completed
    updateLS()
  })

  //Добавить обработчики для ПКМ - удалить элемент
  newTodo.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    e.target.remove()
    tasksArray = tasksArray.filter(({ text }) => text !== e.target.innerText)
    updateLS()
  })

  //Добавить элемент в DOM
  tasksContainer.append(newTodo)
}

//Обновляет данные в localstorage
function updateLS() {
  localStorage.setItem('tasks', JSON.stringify(tasksArray))
}
