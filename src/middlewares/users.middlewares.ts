import { Request, Response, NextFunction } from 'express'
const usersValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send('Loi cmnr')
  }
  next()
}

export default usersValidate
