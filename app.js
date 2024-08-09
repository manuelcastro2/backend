import express, { json } from 'express' // require -> commonJS
import { createProjectRouter } from './routes/projectsRoutes.js'
import { corsMiddleware } from './middliware/cors.js'
import 'dotenv/config'

export const createApp = ({ modelProject }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())

  app.use('/project', createProjectRouter({ modelProject }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}