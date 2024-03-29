import httpStatus from '~/constants/httpStatus'
import { userMessages } from '~/constants/messages'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ errors }: { errors: ErrorsType }) {
    super({ message: userMessages.VALIDATION_ERROR, status: httpStatus.UNPROCESSABLE_ETITY })
    this.errors = errors
  }
}
