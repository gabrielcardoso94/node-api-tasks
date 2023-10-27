import fs from 'node:fs'
import { parse } from 'csv'
import axios from 'axios'

const path = new URL('./files/tarefas.csv', import.meta.url)

const processFile = async () => {
    const records = []
    const parser = fs
        .createReadStream(path, {encoding: 'utf8'})
        .pipe(parse({
            columns: true,
            delimiter: ';',            
            
        }))
    for await(let chunk of parser) {
        const result = await axios.post('http://app:3333/tasks', JSON.stringify(chunk))
        console.log(result.status)

        records.push(chunk)
    }

    console.log(records)
    
}

processFile()