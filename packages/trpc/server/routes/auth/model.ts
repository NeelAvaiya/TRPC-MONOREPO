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

export const getLoggoedInUserInfoInputModel = z.undefined()
export const getLoggoedInUserInfoOutputModel = z.object({
    id: z.string().describe('id of the user created'),
    email: z.email().describe('email address of the user'),
    fullName: z.string().describe('name of the user'),
    profileImageUrl: z.string().url().describe('profile image url of the user').optional().nullable()
})