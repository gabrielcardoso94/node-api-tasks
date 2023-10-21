import http from 'node:http'

const port = 3333

const api = http.createServer((request, response) => {

    if(request.method === 'GET' && request.url === '/tasks') {
        response.end("Hello World")
    }

}).listen(port, () => console.log(`Executando na porta ${port}`))