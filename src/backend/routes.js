import { tasks } from "./server.js"
import { regex } from "./utils/regex.js"
import { Task } from "./../rules/models/task.js"

export const routes = [
    {
        method: 'GET',
        path: regex('/tasks'),
        handle: (request, response) => {
            const {url} = request
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
            
            if(request.body && request.body.title.length > 0 && request.body.description.length > 0) {
                const {title, description} = request.body
                const {url} = request
                const table = url.replace("/", "")
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
            
            if(request.body && request.body.title.length > 0 && request.body.description.length > 0) {
                const {url} = request
                const {id} = request.params
                const table = url.match('(?<table>[a-z]+)').groups.table
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
        method: 'DELETE',
        path: regex('/tasks/:id'),
        handle: (request, response) => {
            const {url} = request            
            const {id} = request.params
            const table = url.match('(?<table>[a-z]+)').groups.table

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