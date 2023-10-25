import http from 'node:http'
import { routes } from './routes.js'
import { convertStream } from './middlewares/convert.js'

const port = 3333

const api = http.createServer(async (request, response) => {
    const {method, url} = request

    await convertStream(request)

    const route = routes.find((route => {
        return route.method === method && route.path.test(url)
    }))

    if(route) {
        const params = route.path.exec(url)
        request.params = params.groups
        request.query = request.params.query ? request.params.query : {}
        console.log(request.query)
        request.table = url.match('(?<table>[a-z]+)').groups.table

        route.handle(request, response)
    } else {
        response.writeHead(500)
        response.end("Erro interno")
    }

}).listen(port, () => console.log(`Executando na porta ${port}`))