import {z} from 'zod'

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string().describe('name of the user'),
    email: z.email().describe('email address of the user'),
    password: z.string().describe('password of the user')
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe('id of the user created')
})

export const signinUserWithEmailAndPasswordInputModel = z.object({
    email: z.email().describe('email address of the user'),
    password: z.string().describe('password of the user')
})

export const signinUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe('id of the user created')
})

