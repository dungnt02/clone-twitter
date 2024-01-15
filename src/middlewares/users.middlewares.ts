import { checkSchema } from 'express-validator'
import { userMessages } from '~/constants/messages'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'
const usersValidate = checkSchema({
  email: {
    notEmpty: {
      errorMessage: userMessages.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: userMessages.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await databaseService.users.findOne({ email: value })
        if (user == null) {
          throw new Error(userMessages.USER_NOT_FOUND)
        }
        req.user = user
        return true
      }
    }
  },
  password: {
    notEmpty: {
      errorMessage: userMessages.PASSWORD_IS_REQUIRED
    },
    isString: {
      errorMessage: userMessages.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 6,
        max: 50
      },
      errorMessage: userMessages.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    },
    errorMessage: userMessages.PASSWORD_MUST_BE_STRONG
  }
})

export const registerValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: userMessages.NAME_IS_REQUIRED
    },
    isString: {
      errorMessage: userMessages.NAME_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 1,
        max: 100
      },
      errorMessage: userMessages.NAME_LENGTH_MUST_BE_FROM_1_TO_100
    },
    trim: true
  },
  email: {
    notEmpty: {
      errorMessage: userMessages.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: userMessages.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value) => {
        const isExistEmail = await usersService.checkEmailExits(value)
        if (isExistEmail) {
          throw new Error(userMessages.EMAIL_ALREADY_EXISTS)
        }
        return true
      }
    }
  },
  password: {
    notEmpty: {
      errorMessage: userMessages.PASSWORD_IS_REQUIRED
    },
    isString: {
      errorMessage: userMessages.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 6,
        max: 50
      },
      errorMessage: userMessages.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    },
    errorMessage: userMessages.PASSWORD_MUST_BE_STRONG
  },
  confirm_password: {
    notEmpty: { errorMessage: userMessages.PASSWORD_IS_REQUIRED },
    isString: {
      errorMessage: userMessages.PASSWORD_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 6,
        max: 50
      }
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      },
      errorMessage: userMessages.CONFIRM_PASSWORD_MUST_BE_A_STRONG
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(userMessages.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
        }
        return true
      }
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      },
      errorMessage: userMessages.DATE_OF_BIRTH_MUST_BE_ISO8601
    }
  }
})

export default usersValidate
