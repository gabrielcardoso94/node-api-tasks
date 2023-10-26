import { regex } from "./utils/regex.js"
import { Task } from "./../rules/models/task.js"
import { Database } from "./database.js"

const tasks = new Database('tasks')

export const routes = [
    {
        method: 'GET',
        path: regex('/tasks'),
        handle: (request, response) => {
            const {table} = request

            if(request.query) {
                const {search} = request.query
                const tasksList = tasks.read(table, search)

                response.writeHead(200, {'Content-Type': 'application/json'})
                response.end(JSON.stringify(tasksList))
            } else {
                const search = 0

                const tasksList = tasks.read(table, search)

                response.writeHead(200, {'Content-Type': 'application/json'})
                response.end(JSON.stringify(tasksList))
            }
            
        }
    },
    {
        method: 'POST',
        path: regex('/tasks'),
        handle: (request, response) => {
            
            if(request.body && request.body.title.length > 0 && request.body.description.length > 0) {
                const {table} = request
                const {title, description} = request.body

                const task = new Task(title, description)
                    
                tasks.create(table, task)
                        
                response.writeHead(201, {'Content-Type': 'application/json'})
                response.end(JSON.stringify(task))
            } else {
                response.writeHead(400)
                response.end("Task inválida")
            }
        }
    },
    {
        method: 'PUT',
        path: regex('/tasks/:id'),
        handle: (request, response) => {
            
            if(request.body && request.body.title.length && request.body.description.length) {
                const {table} = request
                const {id} = request.params
                const task = request.body
                task.updated_at = new Date().toISOString()

                const result = tasks.update(table, id, task)

                if(result) {
                    response.writeHead(204)
                    response.end()
                } else {
                    response.writeHead(400)
                    response.end("ID não encontrado")
                }

            } else {
                response.writeHead(400)
                response.end("Task inválida")
            }
                        
        }
    },
    {
        method: 'PATCH',
        path: regex('/tasks/:id/complete'),
        handle: (request, response) => {
            const {table} = request
            const {id} = request.params

            const result = tasks.patch(table, id)

            if(result) {
                response.writeHead(204)
                response.end()
            } else {
                response.writeHead(400)
                response.end("ID não encontrado")
            }
        }
    },
    {
        method: 'DELETE',
        path: regex('/tasks/:id'),
        handle: (request, response) => {
            const {table} = request            
            const {id} = request.params

            const result = tasks.delete(table, id)

            if(result) {
                response.writeHead(204)
                response.end()
            } else {
                response.writeHead(400)
                response.end("ID não encontrado")
            }
        }
    }
]