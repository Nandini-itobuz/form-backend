import { Response } from 'express'

export const handleErrorResponse = ({
    res,
    code,
    message,
}: {
    res: Response
    code: number
    message?: string
}) => {
    res.status(code).json({
        data: null,
        message,
        success: false,
    })
    return
}
