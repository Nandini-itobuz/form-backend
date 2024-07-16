import { Response, Request, NextFunction } from 'express'
import { applicationModel } from '../schemas/applicationSchema'
import { handleErrorResponse } from '../helper/handleErrorResponse'
import { StatusCodes } from '../enums/statusCodes'

export const checkEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    const findEmails = await applicationModel.find({ email: req.body.email })
    if (findEmails.length > 0) {
        handleErrorResponse({
            res,
            code: StatusCodes.NOT_FOUND,
            message: 'This is an existing email id',
        })
        return
    }
		next();
}
