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

    update(table, id, task) {                
        const index = this.#database[table].findIndex(task => task.id === id)

        if(index > -1) {
            this.#database[table].splice(index, index, task)

            return "Ok"
        } else {

            return undefined
        }
        
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(task => task.id === id)

        if(index > -1) {
            const tasksWithoutTheDeleted = this.#database[table].filter(task => task.id !== id)
            this.#database[table] = tasksWithoutTheDeleted
            
            this.#persist()

            return "Ok"
        } else {
            return undefined
        }

    }
}