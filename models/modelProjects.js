import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const projects = readJSON('./projects.json')

export class ModelProject {
    static async getAll({ task }) {
        if (task) {
            return projects.filter(
                project => project.task.some(t => t.toLowerCase() === task.toLowerCase())
            )
        }
        return projects
    }

    static async getByName({ name }) {
        const project = projects.find(project => project.name === name)
        return project
    }

    static async getById({ id }) {
        const project = projects.find(project => project.id === id)
        return project
    }

    static async create({ project }) {
        const newProject = {
            id: randomUUID(),
            ...project
        }
        projects.push(newProject)
        return newProject
    }

    static async update({ id, project }) {
        const projectIndex = projects.findIndex(project => project.id === id)
        if (projectIndex === -1) return false
        projects[projectIndex] = {
            ...projects[projectIndex],
            ...project
        }

        return projects[projectIndex]
    }

    static async delete({ id }) {
        const projectIndex = projects.findIndex(project => project.id === id)
        if (projectIndex === -1) return false
        projects.splice(projectIndex, 1)
        return true
    }

    static async updateTask({ id, project, idTask }) {
        const projectIndex = projects.findIndex(project => project.id === id)
        const taskIndex = projects[projectIndex].tasks.findIndex(task => task.id === idTask)
        const taskCant = projects[projectIndex].tasks.length
        if (projectIndex === -1) return false
        let taskTrue = 1
        for (let index = 0; index < projects[projectIndex].tasks.length; index++) {
            if (projects[projectIndex].tasks[index].state) {
                taskTrue = taskTrue + 1
            }
        }
        

        const projectProgressing = {
            progressing: (taskTrue * 100) / taskCant,
            stateProject: "progressing"
        }
        projects[projectIndex].tasks[taskIndex] = {
            ...projects[projectIndex].tasks[taskIndex],
            ...project.tasks[0]
        }
        projects[projectIndex] = {
            ...projects[projectIndex],
            ...projectProgressing
        }
        return projects[projectIndex]
    }

    static async createTask({ id, project }) {
        const projectIndex = projects.findIndex(project => project.id === id)
        const taskCant = projects[projectIndex].tasks.length + 1
        let taskTrue = 0
        for (let index = 0; index < projects[projectIndex].tasks.length; index++) {
            if (projects[projectIndex].tasks[index].state) {
                taskTrue = taskTrue + 1
            }

        }
        for (let i = 0; i < project.tasks.length; i++) {
            const newTasks = {
                id: projects[projectIndex].tasks.length + 1,
                name: project.tasks[i].name,
                description: project.tasks[i].description,
                state: project.tasks[i].state
            }
            projects[projectIndex].tasks.push(newTasks)
        }
        const projectProgressing = {
            progressing: (taskTrue * 100) / taskCant
        }
        projects[projectIndex] = {
            ...projects[projectIndex],
            ...projectProgressing
        }

        return projects[projectIndex]
    }
}