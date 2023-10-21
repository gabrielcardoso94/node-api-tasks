import fs from 'node:fs'

export class Database {
    #database = {}
    #path = new URL('../db.json', import.meta.url)

    constructor (table) {
        this.#loadBase(table)
    }

    #loadBase(table) {
        fs.readFile(this.#path, (error, data) => {
            if(data) {
                this.#database = JSON.parse(data.toString())
            } else {
                this.#database[table] = []
            }
        })
    }

    #persist() {
        fs.writeFile(this.#path, JSON.stringify(this.#database), {encoding: 'utf8'}, (err) => console.log(err))
    }

    read(table) {
        const tasks = this.#database[table]

        return tasks
    }

    create(table, task) {
        this.#database[table].push(task)

        this.#persist()
    }
}