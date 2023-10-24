export async function convertStream(request) {
    const content = []
    
    for await (let chunk of request) {
        content.push(chunk) 
    }

    if(content.length) {
        const contentJson = JSON.parse(content.join(","))

        request.body = contentJson
    }
}