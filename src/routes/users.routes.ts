import { Router } from 'express'
import { loginController } from '~/controllers/users.controllers'
import usersValidate from '~/middlewares/users.middlewares'
const userRouter = Router()

userRouter.post('/login', usersValidate, loginController)
export default userRouter
