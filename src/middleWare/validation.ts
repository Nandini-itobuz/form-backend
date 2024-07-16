import { handleErrorResponse } from '../helper/handleErrorResponse'
import { NextFunction, Response, Request } from 'express'
import { applicationModel } from '../schemas/applicationSchema'
import { StatusCodes } from '../enums/statusCodes'

export const handleValidations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        !req.body?.firstName ||
        !req.body?.lastName ||
        !req.body?.age ||
        !req.body?.email ||
        !req.body?.score ||
        !req.body?.institution ||
        !req.body?.degree ||
        !req.body.yearsOfExperience ||
        !req.body.position
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

    const findEmails = await applicationModel.find({ email: req.body.email })
    if (findEmails.length > 0) {
        handleErrorResponse({
            res,
            code: StatusCodes.NOT_FOUND,
            message: `Form doesn't exists`,
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
