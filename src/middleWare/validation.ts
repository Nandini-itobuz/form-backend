import { handleErrorResponse } from '../helper/handleErrorResponse'
import { RequestHandler } from 'express'
import { StatusCodes } from '../enums/statusCodes'
import { applicationModel } from '../schemas/applicationSchema'

export const handleValidations: RequestHandler = async (req, res, next) => {
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
        phone,
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

    const emailExpression: RegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    const emailResult: boolean = emailExpression.test(email)
    if (!emailResult) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: 'Invalid Email Id',
        })
        return
    }

    const findEmails = await applicationModel.findOne({
        email: req.body.email,
    })
    
    if (
        (!req.params.id && findEmails) ||
        (findEmails && ((findEmails?.email != req.body.email) || (findEmails?.email === req.body.email && findEmails._id.toString() != req.params.id)) )
    ) {
        handleErrorResponse({
            res,
            code: StatusCodes.CONFLICT,
            message: 'This is an existing email id',
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
