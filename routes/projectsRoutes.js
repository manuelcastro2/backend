import { Router } from 'express'
import { ControllerProject } from '../controllers/projectsController.js'

export const createProjectRouter = ({ modelProject }) => {
  const projectRouter = Router()

  const projectController = new ControllerProject({ modelProject })

  projectRouter.get('/', projectController.getAll)
  projectRouter.post('/', projectController.create)
  projectRouter.post('/:id', projectController.createTask)

  projectRouter.get('/:name', projectController.getByName)
  projectRouter.get('/id/:id', projectController.getById)
  projectRouter.delete('/:id', projectController.delete)
  projectRouter.patch('/:id', projectController.update)
  projectRouter.patch('/task/:id', projectController.updateTask)
  
  return projectRouter
}