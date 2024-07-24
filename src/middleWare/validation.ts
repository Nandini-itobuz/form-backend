import { handleErrorResponse } from '../helper/handleErrorResponse'
import { RequestHandler } from 'express'
import { StatusCodes } from '../enums/statusCodes'
import applicationYupSchema from '../validation/applicationSchema'
import { applicationModel } from '../schemas/applicationSchema'

export const handleValidations: RequestHandler = async (req, res, next) => {
    try {
        await applicationYupSchema.validate(req.body)
        const findEmails = await applicationModel.findOne({
            email: req.body.email,
        })
        if (
            (!req.body._id && findEmails) ||
            (findEmails &&
                (findEmails?.email != req.body.email ||
                    (findEmails?.email === req.body.email &&
                        findEmails._id.toString() != req.body._id)))
        ) {
            handleErrorResponse({
                res,
                code: StatusCodes.CONFLICT,
                message: 'This is an existing email id!',
            })
            return 
        }
        next()
    } catch (e: any) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: e.errors.map((err: any) => err).join(', '),
        })
    }
}
