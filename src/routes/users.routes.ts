import { Router } from 'express'
import {
  emailVerifyController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import usersValidate, {
  accessTokenValidator,
  emailVerifyTokenValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { validate } from '~/utils/validation'
const userRouter = Router()
/**
 * Description: Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
userRouter.post('/login', validate(usersValidate), loginController)
/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
userRouter.post('/register', validate(registerValidator), registerController)
/**
 * Description: Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
userRouter.post('/logout', validate(accessTokenValidator), validate(refreshTokenValidator), logoutController)
/**
 * Description: Verify email when user client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: { email_verify_token: string }
 */
userRouter.post('/verify-email', validate(emailVerifyTokenValidator), emailVerifyController)

export default userRouter
