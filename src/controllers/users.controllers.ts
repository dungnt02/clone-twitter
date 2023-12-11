import { Request, Response } from 'express'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log(req.body)
  if (email === 'admin@gmail.com' && password === '123456') {
    return res.json({
      message: 'Login success'
    })
  }
  res.status(400).json({
    message: 'Login failed'
  })
}
