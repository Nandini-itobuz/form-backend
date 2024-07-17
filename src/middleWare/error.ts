import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from '../enums/statusCodes'
import mongoose from 'mongoose'
import { handleErrorResponse } from '../helper/handleErrorResponse'

interface CustomError extends Error {
    statusCode?: number
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {


    if (mongoose.Error.ValidationError) {
        return handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: `${err.message} :Validation Errror`,
        })
    }

    if (mongoose.Error.CastError) {
        return handleErrorResponse({
            res,
            code: StatusCodes.BAD_REQUEST,
            message: `${err.message} :Invalid ID Format`,
        })
    }

    return handleErrorResponse({
			res,
			code: StatusCodes.INTERNAL_SERVER_ERROR,
			message: `${err.message} :Internal Server Error`,
	})
}

export default errorHandler
