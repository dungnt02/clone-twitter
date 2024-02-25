import { NextFunction, Request, Response } from 'express'
import { LogoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import usersService from '~/services/users.services'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema'
import { userMessages } from '~/constants/messages'
import databaseService from '~/services/database.services'
import httpStatus from '~/constants/httpStatus'
export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const user_id = user._id as ObjectId
    const result = await usersService.login(user_id.toString())
    return res.json({
      message: userMessages.LOGIN_SUCCESS,
      result
    })
  } catch (error) {
    next(error)
  }
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersService.register(req.body)
    return res.json({
      message: userMessages.REGISTER_SUCCESS,
      result
    })
  } catch (error) {
    next(error)
  }
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.body
    const result = await usersService.logout(refresh_token)
    return res.json(result)
  } catch (error) {
    next(error)
  }
}

export const emailVerifyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.decoded_email_verify_token as TokenPayload
    const user = await databaseService.users.findOne({
      _id: new ObjectId(user_id)
    })
    // Nếu không tìm thấy user thì mình sẽ báo lỗi
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: userMessages.USER_NOT_FOUND
      })
    }
    // Đã verify rồi thì mình sẽ không báo lỗi
    // Mà mình sẽ trả về status OK với message là đã verify trước đó rồi
    if (user.email_verify_token === '') {
      return res.json({
        message: userMessages.EMAIL_ALREADY_VERIFIED
      })
    }
    const result = await usersService.verifyEmail(user_id)
    return res.json({
      message: userMessages.EMAIL_VERIFY_SUCCESS,
      result
    })
  } catch (error) {
    next(error)
  }
}
