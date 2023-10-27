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
        fs.writeFile(this.#path, JSON.stringify(this.#database), {encoding: 'utf8'}, () => {})
    }

    read(table, search) {
        const tasks = this.#database[table]

        if(search) {
            const tasksFiltered = tasks.filter((task) => task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search))

            return tasksFiltered
        }

        return tasks
    }

    create(table, task) {
        this.#database[table].push(task)

        this.#persist()
    }

    update(table, id, task) {                
        const index = this.#database[table].findIndex(task => task.id === id)

        if(index > -1) {
            const databaseUpdated = this.#database[table].filter(task => task.id !== id)
            databaseUpdated.push(task)

            this.#database[table] = databaseUpdated

            this.#persist()

            return 1
        }
        
    }

    patch(table, id) {
        const index = this.#database[table].findIndex(task => task.id === id)

        if(index > -1) {
            this.#database[table].find(task => {
                if(task.id === id) task.completed_at = new Date().toISOString()
            })

            this.#persist()

            return 1
        }
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(task => task.id === id)

        if(index > -1) {
            const tasksWithoutTheDeleted = this.#database[table].filter(task => task.id !== id)
            this.#database[table] = tasksWithoutTheDeleted
            
            this.#persist()

            return 1
        }

    }
}