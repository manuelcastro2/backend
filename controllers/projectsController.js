import { validatePartialProject, validateProject } from './../schema/projectsSchema.js'

export class ControllerProject {
    constructor({ modelProject }) {
        this.modelProject = modelProject
    }

    getAll = async (req, res) => {
        const { task } = req.query
        const project = await this.modelProject.getAll({ task })
        res.json(project)
    }

    getByName = async (req, res) => {
        const { name } = req.params
        const project = await this.modelProject.getByName({ name })
        if (project) return res.json(project)
        res.status(404).json({ message: 'project not found' })
    }

    getById = async (req, res) => {
        const { id } = req.params
        const project = await this.modelProject.getById({ id })
        if (project) return res.json(project)
        res.status(404).json({ message: 'project not found' })
    }

    create = async (req, res) => {
        const result = validatePartialProject(req.body)
        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newProject = await this.modelProject.create({ project: result.data })
        res.status(201).json(newProject)
    }

    delete = async (req, res) => {
        const { id } = req.params
        const result = await this.modelProject.delete({ id })
        if (result === false) {
            return res.status(404).json({ message: 'project not found' })
        }
        return res.json({ message: 'project deleted' })
    }

    update = async (req, res) => {

        const result = validatePartialProject(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        const updateProject = await this.modelProject.update({ id, project: result.data })
        return res.json(updateProject)
    }

    createTask = async (req, res) => {
        const { id } = req.params
        const result = validatePartialProject(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const newProject = await this.modelProject.createTask({ id, project: result.data })
        res.status(201).json({ newProject })
    }

    updateTask = async (req, res) => {
        const { id } = req.params
        const updateProject = await this.modelProject.updateTask({
            id, project: {
                tasks: req.body.tasks
            }, idTask: req.body.idTask
        })
        return res.json(updateProject)
    }

}