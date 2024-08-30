//get the elements
const addTodoForm = document.getElementById("addTodoForm")
const todoTable = document.getElementById("todoTable")
const todoModal = document.getElementById("todoModal")
const cancelButton = document.getElementById("cancelButton")

cancelButton.addEventListener("click", handleCloseModal)

//Event Listeners
addTodoForm.addEventListener("submit", handleAddTodoFormSubmit)

//espacio para contener las tareas, es decir, el estado de la app
let todos = []


//function to generate id
function generateId() {
    // if (todos.length === 0) {
    //     return 1
    // } else {
    //     return todos.length + 1
    // }
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

    }
}


//function to update the UI or DOM
function renderTable() {
    const tableBody = todoTable.querySelector("tbody")
    tableBody.innerHTML = ""
    todos.forEach((item) => {
        const row = document.createElement("tr")
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
    todoModal.showModal()

}

function handleCloseModal() {
    todoModal.close()
}