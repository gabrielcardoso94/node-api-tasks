import { tasks } from "./server.js"
import { regex } from "./utils/regex.js"
import { Task } from "./../rules/models/task.js"

export const routes = [
    {
        method: 'GET',
        path: regex('/tasks'),
        handle: (request, response) => {
            const url = request.url
            const table = url.replace("/", "")
            const tasksList = tasks.read(table)

            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(tasksList))
        }
    },
    {
        method: 'POST',
        path: regex('/tasks'),
        handle: (request, response) => {
            const {title, description} = request.body
            const url = request.url
            const table = url.replace("/", "")
            const task = new Task(title, description)
            
            tasks.create(table, task)

            response.writeHead(201, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(task))
        }
    },
    {
        method: 'PUT',
        path: regex('/tasks/:id'),
        handle: (request, response) => {
            response.end("Rota PUT encontrada.")
        }
    },
    {
        method: 'DELETE',
        path: regex('/tasks/:id'),
        handle: (request, response) => {
            response.end("Rota DELETE encontrada.")
        }
    }
]