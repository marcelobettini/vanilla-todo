//get the elements
const addTodoForm = document.getElementById("addTodoForm")
const todoTable = document.getElementById("todoTable")
const todoModal = document.getElementById("todoModal")
const deleteButtonModal = document.getElementById("deleteButtonModal")
const updateButtonModal = document.getElementById("updateButtonModal")
const toggleButtonModal = document.getElementById("toggleStatusButtonModal")
const cancelButtonModal = document.getElementById("cancelButtonModal")
const todoDescriptionModal = document.getElementById("todoDescriptionModal")
const todoIdModal = document.getElementById("todoIdModal")
const todoStatusModal = document.getElementById("todoStatusModal")
const editTodoForm = document.getElementById("editTodoForm")

//Event Listeners
deleteButtonModal.addEventListener("click", handleDelete)
updateButtonModal.addEventListener("click", handleUpdate)
toggleButtonModal.addEventListener("click", handleToggle)
cancelButtonModal.addEventListener("click", handleCloseModal)
addTodoForm.addEventListener("submit", handleAddTodoFormSubmit)

//espacio para contener las tareas, es decir, el estado de la app
const storedTodos = localStorage.getItem("todo-list")
let todos = JSON.parse(storedTodos)
renderTable()

//funciones del modal de detalle
function handleDelete() {
    const todoId = editTodoForm.querySelector("#todoIdModal").textContent
    todos = todos.filter(todo => todo.id !== todoId)
    renderTable()
    todoModal.close()
    localStorage.setItem("todo-list", JSON.stringify(todos))

}
function handleUpdate() {
    const todoId = editTodoForm.querySelector("#todoIdModal").textContent
    const newText = todoDescriptionModal.value
    todos = todos.map(todo => todo.id === todoId ? { ...todo, description: newText } : todo)
    renderTable()
    todoModal.close()
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function handleToggle() {
    const todoId = editTodoForm.querySelector("#todoIdModal").textContent
    todos = todos.map(todo => todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    console.log(todos)
    renderTable()
    todoModal.close()
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function handleCloseModal() {
    todoModal.close()
}



//function to generate id
function generateId() {
    return crypto.randomUUID()
}

//function to handle add todo form submission
function handleAddTodoFormSubmit(event) {
    event.preventDefault()
    const todoDescriptionInput = addTodoForm.querySelector("#todoDescription")
    const description = todoDescriptionInput.value.trim()
    if (description !== "") {
        const newTodo = {
            id: generateId(),
            description: description,
            isCompleted: false
        }
        todos.push(newTodo)
        renderTable()
        todoDescriptionInput.value = ""
        localStorage.setItem("todo-list", JSON.stringify(todos))

    }
}


//function to update the UI or DOM
function renderTable() {
    const tableBody = todoTable.querySelector("tbody")
    tableBody.innerHTML = ""
    todos.forEach((item) => {
        const row = document.createElement("tr")
        row.setAttribute("data-todo-id", item.id)
        //we need to identify each row 
        row.addEventListener("click", handleRowClick)

        const idCell = document.createElement("td")
        idCell.innerText = item.id.slice(10, 15)
        row.appendChild(idCell)

        const descriptionCell = document.createElement("td")
        descriptionCell.innerText = item.description
        row.appendChild(descriptionCell)

        const statusCell = document.createElement("td")
        let statusContent;
        if (item.isCompleted === true) {
            statusContent = "Terminada"
        } else {
            statusContent = "Pendiente"
        }
        statusCell.innerText = item.isCompleted ? "Completada" : "Pendiente"
        row.appendChild(statusCell)

        tableBody.appendChild(row)
    })
}

function handleRowClick(event) {
    const todoId = event.currentTarget.getAttribute('data-todo-id')
    const todo = todos.find(todo => todo.id === todoId)

    todoIdModal.innerText = todo.id
    todoDescriptionModal.value = todo.description
    todoStatusModal.innerText = todo.isCompleted ? "Completed" : "Pending"

    if (todo.isCompleted) {
        todoStatusModal.classList.remove("pending")
        todoStatusModal.classList.add("completed")
    } else {
        todoStatusModal.classList.remove("completed")
        todoStatusModal.classList.add("pending")

    }
    todoModal.showModal()
}

