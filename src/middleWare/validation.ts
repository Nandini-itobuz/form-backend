import { handleErrorResponse } from '../helper/handleErrorResponse'
import { NextFunction, Response, Request } from 'express'
import { StatusCodes } from '../enums/statusCodes'

export const handleValidations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        firstName,
        lastName,
        age,
        email,
        score,
        institution,
        degree,
        yearsOfExperience,
        position,
    } = req.body
    if (
        !firstName ||
        !lastName ||
        !age ||
        !email ||
        !score ||
        !institution ||
        !degree ||
        !yearsOfExperience ||
        !position
    ) {
        handleErrorResponse({
            res,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Enter requied feilds',
        })
        return
    }

    const emailExpression: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const emailResult: boolean = emailExpression.test(String(req?.body?.email))
    if (!emailResult) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: `Invalid email`,
        })
        return
    }

    const phoneExpression: RegExp = /^[6-9]\d{9}$/
    const phoneResult: boolean = phoneExpression.test(String(req?.body?.phone))
    if (!phoneResult) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: `Invalid Phone`,
        })
        return
    }

    if (new Date(String(req?.body?.startDate)) > new Date()) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: `Date cannot be future dates.`,
        })
        return
    }
    next()
}
