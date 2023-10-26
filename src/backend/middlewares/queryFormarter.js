export async function queryFormater({ query }) {
    
    if(query) {
        const queryFormatted = query.substring(1).split('&').reduce((queryParams, param) => {
            const [key, value] = param.split('=')

            queryParams[key] = value

            return queryParams
        }, {})

        return queryFormatted
    }
}