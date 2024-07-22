import { handleErrorResponse } from '../helper/handleErrorResponse'
import { RequestHandler } from 'express'
import { StatusCodes } from '../enums/statusCodes'
import { applicationZodSchema } from '../validation/applicationSchema'

export const handleValidations: RequestHandler = async (req, res, next) => {
    try {
        applicationZodSchema.parse(req.body)
        next()
    } catch (e: any) {
        handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: e.errors.map((err: any) => err.message).join(', '),
        })
        console.log(e)
    }
}
