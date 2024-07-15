import { Response } from "express";

export const handleErrorResponse = (res: Response, statusCode: number, message?: string) => {
	res.status(statusCode).json({
		data: null,
		message,
		success: false
	});
	return;
}