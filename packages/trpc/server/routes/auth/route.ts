import { userService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { getAuthenticationCookie, setAuthenticationCookie } from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import { createUserWithEmailAndPasswordInputModel, createUserWithEmailAndPasswordOutputModel, getLoggoedInUserInfoInputModel, getLoggoedInUserInfoOutputModel, signinUserWithEmailAndPasswordInputModel, signinUserWithEmailAndPasswordOutputModel } from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure.meta({openapi: {
    method: 'POST',
    path: getPath('/createUserWithEmailAndPassword'),
    tags: TAGS
  }}).input(createUserWithEmailAndPasswordInputModel).output(createUserWithEmailAndPasswordOutputModel)
  .mutation(async ({input, ctx}) => {
    const {fullName, email, password} = input;
    const {id, token} = await userService.createUserWithEmailAndPassword({
      fullName,
      email,
      password
    });

    setAuthenticationCookie(ctx, token)
    return {id};
  }),

  signinUserWithEmailAndPassword: publicProcedure.meta({openapi: {
    method: 'POST',
    path: getPath('/signinUserWithEmailAndPassword'),
    tags: TAGS
  }})
  .input(signinUserWithEmailAndPasswordInputModel)
  .output(signinUserWithEmailAndPasswordOutputModel)
  .mutation(async ({input, ctx}) => {
    const {email, password} = input;
    const {id, token} = await userService.signInWithEmailAndPassword({
      email,
      password
    });

    setAuthenticationCookie(ctx, token)
    return {id};
  }),

  getLoggedInUserInfo: publicProcedure
  .meta({openapi: {
    method: 'POST',
    path: getPath('/getLoggedInUserInfo'),
    tags: TAGS
  }})
  .input(getLoggoedInUserInfoInputModel)
  .output(getLoggoedInUserInfoOutputModel)
  .query(async ({ctx}) => {
    const userToken = getAuthenticationCookie(ctx)
    if(!userToken) throw new Error(`User is not loggedIn`)

      const {id, email, fullName, profileImageUrl} = await userService.verifyAndDecodeUserToken(userToken)

      return {
        id,
        email,
        fullName,
        profileImageUrl
      }
  })

});
