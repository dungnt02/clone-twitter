import { Request, Response } from 'express'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'admin@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login success'
    })
  }
  res.status(400).json({
    message: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })
    return res.json({
      message: 'Register successfully'
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Register failed'
    })
  }
}
