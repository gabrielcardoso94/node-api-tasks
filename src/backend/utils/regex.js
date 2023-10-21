export function regex(path) {
    const expression = /:([a-z0-9]+)/g
    const expressionFormatted = path.replace(expression, '([a-z0-9\-_]+)')
    
    return new RegExp(expressionFormatted)
}