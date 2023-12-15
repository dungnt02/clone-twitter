import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import usersValidate, { registerValidator } from '~/middlewares/users.middlewares'
import { validate } from '~/utils/validation'
const userRouter = Router()

userRouter.post('/login', usersValidate, loginController)

userRouter.post('/register', validate(registerValidator), registerController)

export default userRouter
