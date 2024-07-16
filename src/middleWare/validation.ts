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
        phone
    } = req.body
    if (
        !firstName ||
        !lastName ||
        !age ||
        !phone || 
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
            message: 'All fields are required',
        })
        return
    }

    const emailExpression: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const emailResult: boolean = emailExpression.test(email)
    if (!emailResult) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: 'Invalid Email Id',
        })
        return
    }

    const phoneExpression: RegExp = /^[6-9]\d{9}$/
    const phoneResult: boolean = phoneExpression.test(phone)
    if (!phoneResult) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: 'Invalid Phone Number',
        })
        return
    }

    if (new Date(String(req.body.startDate)) > new Date()) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: 'Date cannot be future dates.',
        })
        return
    }
    next()
}
