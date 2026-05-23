import {createHmac, randomBytes} from 'node:crypto'
import * as JWT from 'jsonwebtoken'
import {db, eq} from '@repo/database'
import {usersTable} from '@repo/database/models/user'
import { type CreateUserWithEmailAndPasswordInputType, GenrateUserTokenPayloadType, createUserWithEmailAndPasswordInput, genrateUserTokenPayload } from "./model"
import { env } from '../env'

class UserService {

    private async getUserByEmail(email: string){
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email))
        if(!result || result.length === 0) return null
        return result[0]
    }

    private async genrateUserToken(payload: GenrateUserTokenPayloadType) {
        // Implementation for generating user token
        const {id} = await genrateUserTokenPayload.parseAsync(payload)
        const token = JWT.sign({id}, env.JWT_SECRET)
        return { token }
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {
        const {fullName, email, password} = await createUserWithEmailAndPasswordInput.parseAsync(payload)

        const existingUserWithEmail = await this.getUserByEmail(email)
        if(existingUserWithEmail) throw new Error(`user with email ${email} already exists`)

        const salt = randomBytes(16).toString('hex')
        const hash = createHmac('sha256', salt).update(password).digest('hex');    

        const userInsertResult = await db.insert(usersTable).values({email, fullName, password: hash, salt}).returning({
            id: usersTable.id
        })

        if(!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id) throw new Error(`somthing went wrong while creating a user`);

        const userId = userInsertResult[0].id
        const {token} = await this.genrateUserToken({ id: userId})

        return {
            id: userId,
            token
        }
    }

}

export default UserService