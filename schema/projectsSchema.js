import { z } from 'zod'

export const projectsSchema = z.object({
    name: z.string(),
    dateInitial: z.string(),
    dateFinal: z.string(),
    progressing: z.number(),
    stateProject: z.enum(['start', 'progressing', 'finally']),
    tasks: z.array(
        z.object({
            "name": z.string(),
            "description": z.string(),
            "state": z.boolean()
        })
    )
})

export function validateProject(input) {
    return projectsSchema.safeParse(input)
}

export function validatePartialProject(input) {
    return projectsSchema.partial().safeParse(input)
}