import { randomUUID } from 'node:crypto'

export class Task {
    constructor(title, description) {
        this.id = randomUUID()
        this.title = title
        this.description = description
        this.created_at = new Date().toISOString()
        this.updated_at = null
        this.completed_at = null
    }
}