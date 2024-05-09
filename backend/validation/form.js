import * as z from 'zod';

export const createLogForm = z.object({
    title: z.string().min(2).max(30),
    description: z.string().min(1),
})