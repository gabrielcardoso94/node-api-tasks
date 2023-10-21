import { regex } from "./utils/regex.js"

export const routes = [
    {
        method: 'GET',
        path: regex('/tasks'),
        handle: (request, response) => {
            response.end("Rota GET encontrada.")
        }
    },
    {
        method: 'POST',
        path: regex('/tasks'),
        handle: (request, response) => {
            response.end("Rota POST encontrada.")
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