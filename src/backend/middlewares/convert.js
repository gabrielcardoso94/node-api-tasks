export async function convertStream(request) {
    const content = []
    
    for await (let chunk of request) {
        content.push(chunk)
    }

    try {
        
        const contentJson = content.join(",")
        
        if(contentJson) {
            request.body = JSON.parse(contentJson)
        }
    }
    catch (err) {
        console.log(err.message)
    }
}