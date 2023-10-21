import http from 'node:http'
import { routes } from './routes.js'

const port = 3333

const api = http.createServer((request, response) => {
    const {method, url} = request

    const route = routes.find((route => {
        return route.method === method && route.path.test(url)
    }))

    if(route) {
        route.handle(request, response)
    }

}).listen(port, () => console.log(`Executando na porta ${port}`))