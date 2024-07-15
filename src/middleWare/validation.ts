import { handleErrorResponse } from "../helper/handleErrorResponse";
import { NextFunction, Response, Request } from "express";
import { applicationModel } from "../schemas/applicationSchema";
import { StatusCodes } from "../enums/statusCodes";

export const handleValidations = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.body?.firstName || !req.body?.lastName || !req.body?.age ||
		!req.body?.email || !req.body?.score || !req.body?.institution || !req.body?.degree || !req.body.yearsOfExperience || !req.body.position) {
		handleErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, `Enter requied feilds`);
		return;
	}

	const emailExpression: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const emailResult: boolean = emailExpression.test(String(req?.body?.email));
	if (!emailResult) { handleErrorResponse(res, StatusCodes.BAD_REQUEST, `Invalid email`); return }

	const findEmails = await applicationModel.find({ email: req.body.email })
	if (findEmails.length > 0) { handleErrorResponse(res, StatusCodes.NOT_FOUND, `Form doesn't exists`); return; }

	const phoneExpression: RegExp = /^[6-9]\d{9}$/;
	const phoneResult: boolean = phoneExpression.test(String(req?.body?.phone));
	if (!phoneResult) { handleErrorResponse(res, StatusCodes.BAD_REQUEST, `Invalid Phone`); return; }

	if (new Date(String(req?.body?.startDate)) > new Date()) { handleErrorResponse(res, StatusCodes.BAD_REQUEST, `Date cannot be future dates.`); return }
	next();
}